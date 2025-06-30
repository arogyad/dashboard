# Dashboard Configuration

## Adding a new printer

To add a new printer to the dashboard view, you need to add the following information about the printer to the `printer.json` file located at `/src/assets/` in the dashboard repository. Here is a sample printer configuration for a printer.

```json
{
  "file": "/mk4.obj",
  "position": [-2, 12, 1.3],
  "rotation": [-1.57, 0, 3.14],
  "scale": [0.03, 0.03, 0.03],
  "link": "http://localhost/instanceName",
  "apiKey": <apikey>,
  "name": <instanceName>,
  "debug": true
}
```

> Above instanceName refers to `{{instanceName}}`

This will place a MK4 printer in at position specified and enable debugging. Having `"debug": true` allows us to change the position, rotation, and scale of the model. After specifying the proper configuration, copy the values to the respective fields and place it in `printers.json` file without the `debug` field.

> I would suggest not changing the rotation and scale property for MK4 and XL printers and having the values as specified. You would need to change the position.

### Available options

| Option   | Description                                                   | Notes                                                                                                                              |
| -------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| file     | name of the file that represents the 3D model for the printer | The path is relative to at `/public/src`                                                                                           |
| position | the position of the 3D model                                  | The property to change when `debug` flag is `true`                                                                                 |
| rotation | the rotation of the 3D model                                  | I would suggest rotation to be a multiple of &pi;                                                                                  |
| scale    | the scale of the model                                        | `0.03` and `0.06` seem like good values for MK4 and XL respectively                                                                |
| link     | the octopi printer link                                       | always in the form `http://localhost/{{instanceName}}`                                                                             |
| apiKey   | API key for interacting with server                           | **Step 2** in [Printer Customization](/?id=printer-customization)                                                                  |
| name     | name of the instance                                          | ` {{instanceName}}`                                                                                                                |
| debug    | debug flag                                                    | I would use this when first time adding a new printer to find its properties (position, rotation, scale), otherwise just ignore it |

## Adding more desks

Similar to printer, additional desks can be added by adding new desk entries to `desks.json` file at `/src/assets`. It also has a `debug` flag which can be set to change position, rotation, and scale. Similar to above, I would recommend keeping rotation to be a multiple of &pi;.
