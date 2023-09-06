const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // prevent default behavior of event (browser's default install prompt)
    event.preventDefault();

    // make Install button visible to user
    butInstall.style.visibility = 'visible';

    // set text on Install button
    butInstall.textContent = 'Install!'
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // disable Install button to prevent multiple installations
    butInstall.setAttribute('disabled', true);

    // change text on Install button to indicate that the PWA is installed
    butInstall.textContent = 'Installed!';
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // when PWA is installed, log message 
    console.log('appinstalled', event);
});
