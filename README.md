All-in-One Responsive Menu
========

All-in-One Responsive Menu (aiormenu) is a jQuery plugin that will take a list menu and create a responsive menu out of that list for smaller viewing widths (e.g. mobile and tablets). There are a number of different types of responsive menus you can choose from.

[View Demo](https://9bitstudios.github.io/aiormenu)

### Options

Below is a listing of options your can set....

| Option | Value | Default Value | Description | Example |
| --- | --- | --- | --- | --- |
| type | String | "select" | The type of responsive menu you want to create. You can use any of the following: "select", "list", "overlay", or "panel", | type: "panel" |
| targetContainer | String | *null* | The selector that you want to place your responsive menu in. If no value is passed in, a default will be used. Default behavior for the "select" and "list" menus is to append to the same container as the menu the plugin is being called on. Default behavior for the "panel" and "overlay" types is to prepend to the <body> | targetContainer: ".mySelector" |
| menuID | String | "responsiveMenu" | The ID that will be given to your dynamically created responsive menu. Used internally by the plugin and provides a hook for other scripts or styles. | menuID: "myID" |
