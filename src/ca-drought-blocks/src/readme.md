First, some background. 

In the coming months, we'll need to migrate [drought.ca.gov](https://drought.ca.gov/) into CDT's stewardship. However, CDT is weary of adopting our current architecture, where each site exists within its own git repo, and every site is configured a bit differently.

This presents an opportunity to create a **_new static site build tool_** that addresses CDT's concerns. 

Here are the general requirements based on current understanding.

1. _The build tool must play nicely with Wordpress VIP._

    Wordpress VIP is CDT's new WP platform. It comes with its own unique features and constraints.

2. _The build tool must be centralized._

    In other words, no separate git repos for each site. We cannot rely on site-specific repositories that are pre-populated with each site's content and custom templates. Instead, we need the ability to build any WPVIP-hosted site via standardized templates and simple configurations.

    The underlying assumption here is that we will not be able to use wordpress-to-github. (There would not be a site-specific repo where we could deposit the content from WP.) We'll still need to make heavy use of WP APIs, so many of the lessons and knowledge gained from wordpress-to-github will be very applicable.

3. _The build tool must support the Design System._

    All Design System components and layouts should be readily available for use. Site-specific options in the Design System, such as color systems and other tokens, should be configurable per-site.

4. _The build tool must accommodate special site features (such as Drought's data visualizations)._

    With that said, per-site customization overall should be kept to a minimum. We should look for ways to support special features without tying them to a specific site configuration, if possible.

5. _We want to maintain and promote ODI's aggressive site performance metrics and standards._ 

    It's all for naught if we're not improving UX for all Californians.