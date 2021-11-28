# DEPLOYMENT

## DEPLOYMENT ON CIN.UFPE.BR
These are the steps currently adopted when deploying to www.cin.ufpe.br/~jhcp/pistar/tool, in order
to gather usage data (Google Analytics) and to add privacy settings.

### index.html
1. Add Google Analytics tag script on the beginning of <head>
2. Add privacy notice on the beginning of <body>
3. Add Privacy settings buttons on the options tab
4. Add app/ui/privacy.js as a dependency

### main.js
1. Add ```ui.startupPrivacySettings();```