// default date(6days ago)
export const defaultStartDate = (() => {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  return d;
})();

// default date(6days ago)
export const defaultEndDate = new Date();
