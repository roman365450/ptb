// Gari Widget - Centralised component
// Custom launcher that triggers DMME widget

(function() {
    'use strict';

    // Create our custom styled widget
    const widgetHTML = `
    <div class="gari-widget-launcher" id="gari-launcher">
        <div class="gari-widget-circle">
            <img src="img/Gari hero trns.png" alt="Ask Gari">
        </div>
        <div class="gari-widget-text">
            ask me a for just $5!
        </div>
    </div>
    `;

    // Create a hidden element that DMME will bind to
    const dmmeIconHTML = `
    <div id="dmme-icon" style="display:none !important;"></div>
    `;

    // Inject widget into page
    function injectWidget() {
        // Find the preview-wrapper or body to append to
        const wrapper = document.querySelector('.preview-wrapper') || document.body;

        // Create and append our custom widget
        const container = document.createElement('div');
        container.innerHTML = widgetHTML.trim();
        const widget = container.firstChild;
        wrapper.appendChild(widget);

        // Create and append hidden dmme-icon for DMME to bind to
        const dmmeContainer = document.createElement('div');
        dmmeContainer.innerHTML = dmmeIconHTML.trim();
        const dmmeIcon = dmmeContainer.firstChild;
        document.body.appendChild(dmmeIcon);

        // When our widget is clicked, click the hidden dmme-icon
        widget.addEventListener('click', function() {
            const hiddenIcon = document.getElementById('dmme-icon');
            if (hiddenIcon) {
                hiddenIcon.click();
            }
        });

        // Watch for and hide DMME residue elements
        hideDmmeResidue();
        setInterval(hideDmmeResidue, 500);
    }

    // Hide any DMME elements that shouldn't be visible
    function hideDmmeResidue() {
        // Find all elements with dmme in class or id
        document.querySelectorAll('[class*="dmme-"], [id*="dmme-"]').forEach(function(el) {
            // Skip if it's the modal that's actually open
            if (el.classList.contains('open') || el.classList.contains('active')) {
                return;
            }
            // Skip our hidden icon
            if (el.id === 'dmme-icon') {
                return;
            }
            // Hide everything else
            el.style.display = 'none';
            el.style.visibility = 'hidden';
            el.style.opacity = '0';
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectWidget);
    } else {
        injectWidget();
    }
})();
