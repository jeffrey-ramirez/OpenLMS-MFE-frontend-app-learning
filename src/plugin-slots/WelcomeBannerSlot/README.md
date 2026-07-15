# Welcome Banner Slot

### Slot ID: `org.openedx.frontend.learning.welcome_banner.v1`
### Props:
* `username`

## Description

This slot renders directly below the course header on every course tab. It shows a "Welcome back, {username}!" greeting along with the learner's avatar (their uploaded profile image, or a placeholder avatar when none has been uploaded).

The slot - and everything inside it - is only rendered for logged in members. Anonymous/logged out visitors previewing a course never see this slot.

## Example

The following `env.config.jsx` will replace the default welcome banner with a custom implementation.

```js
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.learning.welcome_banner.v1': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'org.openedx.frontend.learning.welcome_banner.v1',
            type: DIRECT_PLUGIN,
            priority: 60,
            RenderWidget: ({ username }) => (
              <div className="p-3">
                Hey {username}, glad to see you!
              </div>
            ),
          },
        },
      ],
    },
  },
}

export default config;
```
