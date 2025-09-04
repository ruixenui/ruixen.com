# ruixen

A CLI for adding Ruixen UI components to your project. Superset of shadcn-ui.

```bash
 ##   ##                      ##                  ##   ##   ####
 ### ###                                          ##   ##    ##
 #######   ####     ### ##   ###      ####        ##   ##    ##
 #######      ##   ##  ##     ##     ##  ##       ##   ##    ##
 ## # ##   #####   ##  ##     ##     ##           ##   ##    ##
 ##   ##  ##  ##    #####     ##     ##  ##       ##   ##    ##
 ##   ##   #####       ##    ####     ####         #####    ####
                   #####
```

## Usage

Use the `init` command to initialize dependencies for a new project.

The `init` command installs dependencies (`framer-motion`), adds the `cn` util, configures `tailwind.config.js`, and CSS variables for the project.

```bash
npx ruixen-cli init
```

### shadcn-ui project

If your project is already using the `shadcn-ui`, don't worry! You can still use ruixen.

```bash
npx shadcn-ui init
```

Just add these two lines to your `components.json` file:

```diff
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
+   "ui": "@/components/ui",
+   "ruixen": "@/components/ruixen"
  }
}
```

## add

Use the `add` command to add components to your project.

The `add` command adds a component to your project and installs all required dependencies.

```bash
npx ruixen-cli add [component]
```

### Example

```bash
npx ruixen-cli add bento-grid
```

You can also use the optional `--all` flag to install all components:

```bash
npx ruixen-cli add --all
```

You can also use the `--exmaple` flag to select and install example & demo you saw on webside:

```bash
npx ruixen-cli add --example
```

You can also run the command without any arguments to view a list of all available components:

```bash
npx ruixen-cli add
```

## shadcn-ui

You can also use the same CLI for selecting & installing shadcn-ui components:

```bash
npx ruixen-cli add --shadcn button
```

```bash
npx ruixen-cli add --shadcn --all
```

## Documentation

Visit [https://ruixen.com/docs/installation](https://ruixen.com/docs/installation) to view the documentation.

## License

Licensed under the [MIT license](https://github.com/ruixenui/ruixen.com/blob/main/LICENSE.md).
