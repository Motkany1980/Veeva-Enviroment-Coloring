# Veeva Vault Environment Indicator - Microsoft Edge Extension

## Purpose

This browser extension provides a simple visual indicator for identifying different Veeva Vault environments.

Depending on the configured environment, the extension:

- Changes the color of the **Veeva Vault header bar**.
- Displays a configurable **Environment / Environment Note** in the upper-right corner of the Veeva Vault screen.
- Allows different colors and labels to be configured for different Veeva Vault hostnames.

This makes it easier to visually distinguish environments such as **Production**, **Test**, **Validation**, or **Sandbox** and helps reduce the risk of accidentally performing an action in the wrong Vault environment.

---

## Environment Configuration

The extension uses the Veeva Vault **hostname** to determine which configuration should be applied.

Each environment can be configured with the following values:

| Setting | Description | Example |
|---|---|---|
| **URL / Hostname** | The hostname of the Veeva Vault environment. Enter only the hostname according to the example, without `https://` or additional URL paths. | `company-qa.veevavault.com` |
| **Environment / Környezet** | A custom environment name or note. This text is displayed in the upper-right corner of the Veeva Vault screen. | `VALIDATION` |
| **Color / Szín** | Defines the color applied to the Veeva Vault header bar for the specified environment. | `Orange` |

### Example

For the following Veeva Vault URL:

`https://company-qa.veevavault.com/ui/`

configure the hostname as:

`company-qa.veevavault.com`

Example configuration:

- **URL / Hostname:** `company-qa.veevavault.com`
- **Environment:** `VALIDATION`
- **Color:** `Orange`

When the configured hostname is detected, the extension changes the Veeva Vault header bar to the selected color and displays **VALIDATION** in the upper-right corner.

---

# Installing the Extension in Microsoft Edge

## 1. Download the Extension Files

1. Download the browser extension files to your computer.
2. Save them into **any folder of your choice**, for example:

   `C:\Extensions\VeevaVaultEnvironmentIndicator`

3. If the extension is provided as a ZIP file, **extract the ZIP file** into this folder.
4. Remember the location of this folder because **this folder must be selected later in Microsoft Edge**.

> **Important:** When loading the extension, select the folder that directly contains the extension files, including the `manifest.json` file.

---

## 2. Open the Microsoft Edge Extensions Page

1. Open **Microsoft Edge**.
2. Enter the following address into the address bar:

   `edge://extensions/`

3. Press Enter.

---

## 3. Enable Developer Mode

On the **Manage extensions** page, enable **Developer mode**.

Developer mode allows Microsoft Edge to load an unpacked extension directly from a local folder.

---

## 4. Load the Extension

1. Select **Load unpacked**.
2. Browse to the folder where you downloaded and extracted the extension.
3. Select the folder that contains the `manifest.json` file.
4. Confirm the folder selection.

Microsoft Edge will load the extension.

After successful installation, the extension will appear under the installed extensions on the **Manage extensions** page.

---

## 5. Display the Extension in Microsoft Edge

1. Select the **Extensions** puzzle-piece icon next to the Microsoft Edge address bar.
2. Find the **Veeva Vault Environment Indicator** extension.
3. Configure Microsoft Edge to display the extension on the toolbar if required.

The extension can now be accessed directly from the Microsoft Edge toolbar.

---

## 6. Configure the Veeva Vault Environment

Open the extension and configure the required environment.

Example:

| Parameter | Value |
|---|---|
| **URL / Hostname** | `company-qa.veevavault.com` |
| **Environment** | `VALIDATION` |
| **Color** | `Orange` |

> **Hostname:** Enter only the hostname. Do not include `https://`, `/ui/`, or other URL paths.

For example:

**Correct:**

`company-qa.veevavault.com`

**Incorrect:**

`https://company-qa.veevavault.com/ui/`

---

## Troubleshooting

If the extension does not appear or does not work:

1. Open `edge://extensions/`.
2. Verify that the extension is **enabled**.
3. Verify that **Developer mode** is enabled.
4. Verify that the correct extension folder was selected.
5. Confirm that the selected folder contains the `manifest.json` file.
6. Verify that the configured **URL / Hostname** exactly matches the hostname of the Veeva Vault environment.
7. Restart Microsoft Edge if necessary.

> **Security Note:** Developer mode allows unpacked and unverified browser extensions to be loaded into Microsoft Edge. Only install extensions obtained from a trusted source.
