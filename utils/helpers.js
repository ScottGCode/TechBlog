module.exports = {
// Format date and time information to MM/DD/YYYY HH:mm
    format_date: (date) => {
// Define format strings
    const dateFormat = 'MM/DD/YYYY';
    const timeFormat = 'HH:mm';
// Format date and time
    const d = new Date(date);
    const formattedDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    return `${formattedDate} at ${formattedTime}`;
    },
};