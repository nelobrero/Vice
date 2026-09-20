export function groupByStatus(applications) {
  return applications.reduce((groups, app) => {
    const key = app.status;

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(app);
    return groups;
  }, {});
}   