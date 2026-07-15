import React, { useContext } from 'react';

import { AppContext } from '@edx/frontend-platform/react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';

import { WelcomeBanner } from '@edx/frontend-component-header';

/**
 * Renders the learner "Welcome back" greeting banner directly below the
 * course header. Only visible to logged in members - it is hidden entirely
 * for anonymous/logged out visitors previewing the course.
 */
const WelcomeBannerSlot = () => {
  const { authenticatedUser } = useContext(AppContext);

  if (!authenticatedUser) {
    return null;
  }

  return (
    <PluginSlot
      id="org.openedx.frontend.learning.welcome_banner.v1"
      pluginProps={{
        username: authenticatedUser.username,
      }}
    >
      <WelcomeBanner />
    </PluginSlot>
  );
};

export default WelcomeBannerSlot;
