# Octodeploy Configuration

## Adding Printer

To add a new instance of printer to Octopi, open up a terminal and type the following command.

```bash
sudo ./octoprint_deploy/octoprint_deploy.sh
```

This will run the `octoprint_deploy` script.

- Choose `Add Instance` and complete the configuration step.
- Enter the name of the printer. (**This will be the printer link at the end**)
- You can use an existing instance as template. This will copy all of the configurations and gcode script that have been setup previously.
  - Choose `Hydrogen` if the printer to add is MK4/S.
  - Choose `Silicon` if the printer to add if XL.
  - For other printers, you will have to set up the configuration later in Octopi Server.
- Continue with instance creation, just press `y`.
- Choose `haproxy` option as `y` to add the printer to `http://<ip>/instancename`.

You can also add camera at this step by choosing `y` on the option to `Add associated USB Camera`. After adding all of the plugins and print history should be syncronized by which template was choosen.

> I would recommend adding the camera later. :) Also I never received any error while adding a printer.

### Printer Customization

If one of the template was choosen during the configuration, then you can skip **Step 1**. However, if a new printer was added all of the following steps would need to be completed.

1. **Setting up Printer Profile**

- Open the octopi server for the printer `http://localhost/instancename`
- Go to "Settings" > "Printer" > "Printer Profiles" > "Add Profile"
- Complete the step, and go to `Print bed & build volume`
- Fill out the associated values from printer specification documentation.

2. **Enabling API access**

- Open the url for the printer
- Go to "Settings" > "Features" > API and make sure `Allow Cross Origin Resource Sharing (CORS)` is checked, this will allow us to interact with the printer from dashboard later
  > I like to add a new api user, with name `api_<instancename>`, with just read access to allow for interface with the octopi server later in dashboard.
- Go to "Features" > "Application Keys" and select the associated read-only api user. For `Application identifier`, I just have it as "dashboard". Select `Generate` and copy the api key. We will need this later when adding printer in the frontend dashboard.

## Adding Camera

Run the same script as above,

```bash
sudo ./octoprint_deploy/octoprint_deploy.sh
```

After running the `octoprint_deploy` script,

- Choose `Add USB Camera` and complete the configuration.
- Choose the associated printer.
- Choose `y` on `Add cameras to haproxy`, and follow the configuration step.
- Enter the resolution (I had the resolution as `1280x720`).
- Enter `0` to use ustreamer hardware, and complete the configuration.

You can check if the camera is working properly by going to `http://<ip>/cam_instancename/?action=stream`. I had encountered some problems when I was adding the camera which I will list below.

### Errors

- Octoprint registers camera by their serial number, so if same model camera is used then it messes up the association between instances. The only solution here would be to use different kinds of camera.
- If stream isn't showing up on instance url, check if the stream is live by going to `http://<ip>/cam_instancename/?action=stream`. Here, `instancename` is the name of the printer associated with the camera.
  - If the url is not live, it means that the service for the camera isn't running. Open a terminal and type the following command.
  ```bash
    sudo systemctl start ./octoprint_deploy/cam_instancename.service
  ```
  - If the url is live, i.e. you see a stream on the camera url, but on the octopi instance url there is no preview (`Webcam stream not loaded`). Go to "Settings" > "Plugins" > "Classic Webcam" and enter `/cam_instancename/?action=stream` on Stream URl.
- If None of this fixes the error, try deleting the camera from `octoprint_deploy` and adding it again.
