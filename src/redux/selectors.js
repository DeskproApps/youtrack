export const appStore = store => {
  return store.app;
};

export const getProjects = store => {
  return appStore(store).projects;
};

export const getIssues = store => {
  return appStore(store).issues;
};
