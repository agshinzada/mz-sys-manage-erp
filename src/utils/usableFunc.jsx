export default function formatDateTime(dateString, offsetHours = 0) {
  const dateObject = new Date(dateString);

  // Adjust the time zone offset (in hours), if provided
  const adjustedDate = new Date(
    dateObject.getTime() + offsetHours * 60 * 60 * 1000
  );

  // Extract date and time components
  const year = adjustedDate.getFullYear();
  const month = String(adjustedDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(adjustedDate.getDate()).padStart(2, "0");
  const hours = String(adjustedDate.getHours()).padStart(2, "0");
  const minutes = String(adjustedDate.getMinutes()).padStart(2, "0");
  const seconds = String(adjustedDate.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatDateTimeStamp(dateString, offsetHours = 0) {
  const dateObject = new Date(dateString);

  // Adjust the time zone offset (in hours), if provided
  const adjustedDate = new Date(
    dateObject.getTime() + offsetHours * 60 * 60 * 1000
  );

  // Extract date and time components
  const hours = String(adjustedDate.getHours()).padStart(2, "0");
  const minutes = String(adjustedDate.getMinutes()).padStart(2, "0");
  const seconds = String(adjustedDate.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

export function formatDate(dateString, offsetHours = 0) {
  const dateObject = new Date(dateString);

  // Adjust the time zone offset (in hours), if provided
  const adjustedDate = new Date(
    dateObject.getTime() + offsetHours * 60 * 60 * 1000
  );

  // Extract date and time components
  const year = adjustedDate.getFullYear();
  const month = String(adjustedDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(adjustedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
