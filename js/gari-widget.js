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
            ask me a question for just £15!
        </div>
    </div>
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

        // When our widget is clicked, trigger the DMME widget's icon click
        widget.addEventListener('click', function() {
            // The DMME widget creates .dmme-icon element - click it to open modal
            const dmmeIcon = document.querySelector('.dmme-icon');
            if (dmmeIcon) {
                dmmeIcon.click();
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectWidget);
    } else {
        injectWidget();
    }
})();
