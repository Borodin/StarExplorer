export const FormatDate = ({ date }: { date: string | number }) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });
  return <>{formatter.format(new Date(Number.parseInt(date.toString(), 10) * 1000))}</>;
};
