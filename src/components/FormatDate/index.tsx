import React from "react";

export const FormatDate = ({date}: { date: string | number }) => {
  const formatter = new Intl.DateTimeFormat('en-EN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });
  return <>{formatter.format(new Date(parseInt(date.toString()) * 1000))}</>
}