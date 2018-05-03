# netflix-osc
With both an OSC server and a websocket server, bridges OSC messages to control Netflix playback on the browser.

You need to install forever globally:
`npm i forever -g`

You'll need **Tampermonkey** (Google Chrome extension).
Install the *NetflixOSC.tamper.js* script (you may simply drop the file on any Chrome tab).

The server will recognize messages sent to */1/pauseplay*.
A **1** pauses the stream.
A **0** resumes it.

If your player stays paused for too long, the userscript won't be able to play it back.
You better reload the page then.

TouchOSC layout available as *Netflix-OSC-v1.touchosc*.
