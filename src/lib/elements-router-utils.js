'use strict';

const urlParser = req => req.split('/').filter(a => a.length > 0);

const getTokens = req => urlParser(req).map((p, i) => ({token: p, pos: i}));

const extractParams = (routeTokens, requestTokens) => {
  let parameters = {};
  let params = routeTokens.slice(1).map(p => p.token.replace(':', ''));
  let values = requestTokens.slice(1).map(p => p.token);
  for (let i = 0; i < params.length; i++) {
    parameters[params[i]] = values[i];
  }
  return parameters;
};

const validateSameTokenLength = tokens => {
  return tokens.requestTokens.length === tokens.routeTokens.length;
};

const hasSameBaseToken = tokens => {
  if (tokens.requestTokens.length > 0) {
    return tokens.requestTokens[0].token === tokens.routeTokens[0].token;
  } else {
    return true;
  }
};

export const lookupRoute = (routeList, requestPath) => {
  let match = routeList
    .map(route => ({
      route: route,
      requestTokens: getTokens(requestPath),
      routeTokens: getTokens(route.path)
    }))
    .filter(validateSameTokenLength)
    .filter(hasSameBaseToken);

  if (match.length === 0) {
    return null;
  } else {
    let hasParameters = match[0].requestTokens.length > 0;
    return {
      route: match[0].route,
      routePath: requestPath,
      params: hasParameters
        ? extractParams(match[0].routeTokens, match[0].requestTokens)
        : {}
    };
  }
};
