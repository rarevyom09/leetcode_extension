// content.js

// Create a button element
const extensionButton = document.createElement('button');
extensionButton.innerText = 'Open Extension';

// Add a click event listener to the button
extensionButton.addEventListener('click', () => {
  // Send a message to the background script to trigger your extension
  chrome.runtime.sendMessage({ action: 'openExtension' });
});

// Find a suitable location on the LeetCode page to insert the button
const problemHeader = document.querySelector('.css-1x0hc3d');
if (problemHeader) {
  // Insert the button before the problem header
  problemHeader.parentNode.insertBefore(extensionButton, problemHeader);
}
