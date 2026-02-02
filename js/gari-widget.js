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

    // Hide only specific DMME residue elements (modal body when closed)
    function hideDmmeResidue() {
        // Only target specific residue elements - the modal body containers
        // that remain visible after the chat is closed
        document.querySelectorAll('.dmme-modal-body, .dmme-bubble-bg').forEach(function(el) {
            // Skip if it's part of an open modal
            const parent = el.closest('.open, .active, [style*="display: block"]');
            if (parent) {
                return;
            }
            // Hide residue
            el.style.display = 'none';
            el.style.visibility = 'hidden';
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectWidget);
    } else {
        injectWidget();
    }
})();
