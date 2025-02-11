export const fillMonth = (): Date[] => {
  const dates: Date[] = [];
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  for (
    let date = startOfMonth;
    date <= today;
    date.setDate(date.getDate() + 1)
  ) {
    dates.push(new Date(date));
  }

  return dates;
};
