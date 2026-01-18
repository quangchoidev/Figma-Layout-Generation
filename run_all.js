const { execSync } = require('child_process');

const scripts = [
    'V3_generate_design_system.js',
    'V3_generate_homepage.js',
    'V3_generate_shop_grid.js',
    'V3_generate_shop_list.js',
    'V3_generate_product_detail.js',
    'V3_generate_search_results.js',
    'V3_generate_blog_list.js',
    'V3_generate_cart.js',
    'V3_generate_checkout_step1.js',
    'V3_generate_checkout_step2.js',
    'V3_generate_order_success.js',
    'V3_generate_login_register.js',
    'V3_generate_batch_footer_pages.js'
];

for (const script of scripts) {
    console.log(`🚀 Running ${script}...`);
    try {
        execSync(`node ${script}`, { stdio: 'inherit' });
    } catch (e) {
        console.error(`❌ Error in ${script}:`, e.message);
    }
}
console.log("✅ ALL SCRIPTS COMPLETED!");
