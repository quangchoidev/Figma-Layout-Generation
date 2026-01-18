const { execSync } = require('child_process');

console.log('🎨 ========================================');
console.log('   BOOKVN FIGMA LAYOUT GENERATION');
console.log('   17 Pages Complete System');
console.log('========================================\n');

const scripts = [
    // 1. Design System Reference (MUST BE FIRST)
    { file: 'V3_generate_design_system.js', name: 'Design System Reference' },

    // 2. Public & Discovery Pages
    { file: 'V3_generate_homepage.js', name: 'Homepage' },
    { file: 'V3_generate_shop_grid.js', name: 'Shop Grid Page' },
    { file: 'V3_generate_shop_list.js', name: 'Shop List Page' },
    { file: 'V3_generate_product_detail.js', name: 'Product Detail Page' },
    { file: 'V3_generate_search_results.js', name: 'Search Results Page' },
    { file: 'V3_generate_blog_list.js', name: 'Blog List Page' },
    { file: 'V3_generate_blog_post.js', name: 'Blog Post Page' },

    // 3. E-commerce Pages
    { file: 'V3_generate_cart.js', name: 'Cart Page' },
    { file: 'V3_generate_checkout_step1.js', name: 'Checkout Step 1 (Shipping)' },
    { file: 'V3_generate_checkout_step2.js', name: 'Checkout Step 2 (Payment)' },
    { file: 'V3_generate_order_success.js', name: 'Order Success Page' },

    // 4. User Account Pages
    { file: 'V3_generate_login_register.js', name: 'Login/Register Page' },
    { file: 'V3_generate_dashboard.js', name: 'Dashboard Page' },
    { file: 'V3_generate_my_orders.js', name: 'My Orders Page' },
    { file: 'V3_generate_profile_settings.js', name: 'Profile Settings Page' },

    // 5. Footer & Static Pages
    { file: 'V3_generate_batch_footer_pages.js', name: 'Footer Pages (About, Contact, etc.)' }
];

let completed = 0;
let failed = 0;

for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i];
    console.log(`\n[${i + 1}/${scripts.length}] 🚀 Generating: ${script.name}...`);
    console.log(`    File: ${script.file}`);

    try {
        execSync(`node ${script.file}`, { stdio: 'inherit' });
        completed++;
        console.log(`    ✅ SUCCESS: ${script.name}`);
    } catch (e) {
        failed++;
        console.error(`    ❌ FAILED: ${script.name}`);
        console.error(`    Error: ${e.message}`);
    }

    // Small delay between pages to avoid server congestion
    if (i < scripts.length - 1) {
        await new Promise(r => setTimeout(r, 1000));
    }
}

console.log('\n========================================');
console.log('📊 GENERATION SUMMARY');
console.log('========================================');
console.log(`✅ Completed: ${completed}/${scripts.length}`);
console.log(`❌ Failed: ${failed}/${scripts.length}`);
console.log('========================================\n');

if (failed === 0) {
    console.log('🎉 ALL PAGES GENERATED SUCCESSFULLY!');
    console.log('📂 Check your Figma file for the complete design system.\n');
} else {
    console.log('⚠️  Some pages failed to generate. Please check the errors above.\n');
}

// Helper function for async delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
