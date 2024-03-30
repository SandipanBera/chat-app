function extractTimeFromMongoDBCreatedAt(createdAt) {
    // Convert MongoDB's ISODate string to JavaScript Date object
    const dateObj = new Date(createdAt);
    
    // Extract hours, minutes
    const hours = dateObj.getHours()<10?"0"+dateObj.getHours():dateObj.getHours();
    const minutes = dateObj.getMinutes()<10?"0"+dateObj.getMinutes():dateObj.getMinutes();

    // Format the time as a string
    const formattedTime = `${hours}:${minutes}`;

    return formattedTime;
}
export default extractTimeFromMongoDBCreatedAt