const request = require('request');

const fetchMyIP = function(callback) {
	request('https://api.ipify.org?format=json', (error, response, body) => {
		if (error) return callback(error, null);

		if (response.statusCode !== 200) {
			callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
			return;
		}

		const ip = JSON.parse(body).ip;
		callback(null, ip);
	});
};
// iss.js
/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */
const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    const parsedBody = JSON.parse(body);

    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    } 

    const { latitude, longitude } = parsedBody;

    callback(null, {latitude, longitude});
  });
};

// Don't need to export the other function since we are not testing it right now.
module.exports = { fetchCoordsByIP };
module.exports = { fetchMyIP, fetchCoordsByIP };

