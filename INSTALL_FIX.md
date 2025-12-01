# Fixing npm install Issues

If you encounter dependency resolution errors, follow these steps:

## Solution 1: Clean Install (Recommended)

```bash
# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install
```

## Solution 2: Use Legacy Peer Deps

If the clean install doesn't work, use:

```bash
npm install --legacy-peer-deps
```

## Solution 3: Use npm ci (if package-lock.json exists)

```bash
npm ci
```

## TypeScript Version

The project uses TypeScript `~4.9.5` which is compatible with `react-scripts@5.0.1`. 

If you need to update TypeScript, you may need to update `react-scripts` as well, or use `--legacy-peer-deps`.

## PowerShell Issues

If you're using PowerShell and get execution policy errors:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Or use Command Prompt instead of PowerShell.

