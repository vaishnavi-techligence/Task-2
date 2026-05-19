/**
 * Main Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation & Tab Switching
    const navButtons = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons and views
            navButtons.forEach(b => b.classList.remove('active'));
            views.forEach(v => v.classList.remove('active'));

            // Add active class to clicked button
            const currentBtn = e.currentTarget;
            currentBtn.classList.add('active');

            // Show target view
            const targetId = currentBtn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');

            // Close mobile sidebar if open
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }

            // If switching to analytics, trigger chart resize to ensure they render correctly
            if (targetId === 'analytics-view') {
                window.dispatchEvent(new Event('resize'));
            }
        });
    });

    // 1.5 Profile Dropdown Toggle
    const userProfileBtn = document.getElementById('userProfileBtn');
    const profileDropdown = document.getElementById('profileDropdown');

    if (userProfileBtn && profileDropdown) {
        userProfileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('show');
        });

        // Close when clicking elsewhere
        document.addEventListener('click', () => {
            profileDropdown.classList.remove('show');
        });
    }

    // 2. Intersection Observer for Fade-ins and Slide-ins
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -150px 0px',
            threshold: 0.1
        };

        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => scrollObserver.observe(el));
    } else {
        // If reduced motion is preferred, immediately show all elements
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.add('is-visible');
        });
    }

    // 3. Dropdown Logic & Chart.js Initialization
    const datePickerBtn = document.getElementById('datePickerBtn');
    const dateDropdown = document.getElementById('dateDropdown');
    const dateOptions = document.querySelectorAll('.date-option');
    const selectedDateRange = document.getElementById('selectedDateRange');

    // Store chart instances to destroy them before re-rendering
    let chartInstances = {};

    if (datePickerBtn && dateDropdown) {
        datePickerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = datePickerBtn.getAttribute('aria-expanded') === 'true';
            datePickerBtn.setAttribute('aria-expanded', !isExpanded);
            dateDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            datePickerBtn.setAttribute('aria-expanded', 'false');
            dateDropdown.classList.remove('show');
        });

        dateOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                dateOptions.forEach(opt => opt.classList.remove('active'));
                e.target.classList.add('active');

                const days = e.target.getAttribute('data-value');
                selectedDateRange.textContent = e.target.textContent;

                // Re-render charts with new data
                renderCharts(parseInt(days));
            });
        });
    }

    const renderCharts = (daysFilter = 30) => {
        // Destroy existing charts
        Object.values(chartInstances).forEach(chart => chart.destroy());

        // Chart Configs - Premium Theme Colors & Animations
        Chart.defaults.color = '#94a3b8';
        Chart.defaults.font.family = "'Inter', sans-serif";
        const gridColor = 'rgba(255, 255, 255, 0.05)';
        const tooltipConfig = {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            titleColor: '#f8fafc',
            bodyColor: '#f8fafc',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            boxPadding: 4
        };

        // --- Filter Data based on daysFilter ---
        // For demonstration, we simply slice the mock arrays based on days
        // Assuming 1 day = 1 data point (or a subset of the array)

        const filterData = (dataArray) => {
            if (daysFilter === 30) return dataArray;
            // Return last 40% of data for 7 days simulation
            const startIdx = Math.max(0, Math.floor(dataArray.length * 0.6));
            return dataArray.slice(startIdx);
        };

        const filteredRevenue = filterData(window.mockData.rawRevenueData);
        const filteredTraffic = filterData(window.mockData.rawTrafficEvents);
        const filteredActivity = filterData(window.mockData.rawActivityData);

        // Process data for Revenue Chart (Bar)
        const revenueByMonth = window.utils.groupBy(filteredRevenue, 'month');
        const revenueChartData = window.utils.prepareChartData(revenueByMonth, 'amount');

        const ctxRevenue = document.getElementById('revenueChart');
        if (ctxRevenue) {
            chartInstances.revenue = new Chart(ctxRevenue, {
                type: 'bar',
                data: {
                    labels: revenueChartData.labels,
                    datasets: [{
                        label: 'Revenue ($)',
                        data: revenueChartData.data,
                        backgroundColor: 'rgba(99, 102, 241, 0.8)',
                        borderRadius: 6,
                        hoverBackgroundColor: '#818cf8',
                        borderWidth: 1,
                        borderColor: 'transparent',
                        hoverBorderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 1000,
                        easing: 'easeOutQuart'
                    },
                    scales: {
                        y: { grid: { color: gridColor }, beginAtZero: true },
                        x: { grid: { display: false } }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: tooltipConfig
                    }
                }
            });
        }

        // Process data for Traffic Sources Chart (Polar Area for variety and Pinterest vibe)
        const trafficBySource = window.utils.groupBy(filteredTraffic, 'source');
        const trafficChartData = window.utils.prepareChartData(trafficBySource, 'visitors');

        const ctxTraffic = document.getElementById('trafficChart');
        if (ctxTraffic) {
            chartInstances.traffic = new Chart(ctxTraffic, {
                type: 'doughnut',
                data: {
                    labels: trafficChartData.labels,
                    datasets: [{
                        data: trafficChartData.data,
                        backgroundColor: [
                            'rgba(99, 102, 241, 0.8)', // Indigo
                            'rgba(236, 72, 153, 0.8)', // Pink
                            'rgba(16, 185, 129, 0.8)', // Emerald
                            'rgba(245, 158, 11, 0.8)'  // Amber
                        ],
                        hoverBackgroundColor: [
                            '#818cf8', '#f472b6', '#34d399', '#fbbf24'
                        ],
                        borderWidth: 2,
                        borderColor: '#1e293b',
                        hoverOffset: 10
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    animation: {
                        animateScale: true,
                        animateRotate: true,
                        duration: 1500
                    },
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        },
                        tooltip: tooltipConfig
                    }
                }
            });
        }

        // Process data for Activity Chart (Line)
        const ctxActivity = document.getElementById('activityChart');
        if (ctxActivity) {
            const gradient = ctxActivity.getContext('2d').createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(236, 72, 153, 0.6)');
            gradient.addColorStop(1, 'rgba(236, 72, 153, 0.0)');

            chartInstances.activity = new Chart(ctxActivity, {
                type: 'line',
                data: {
                    labels: filteredActivity.map(d => d.hour),
                    datasets: [{
                        label: 'Active Users',
                        data: filteredActivity.map(d => d.active_users),
                        borderColor: '#ec4899',
                        backgroundColor: gradient,
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#1e293b',
                        pointBorderColor: '#ec4899',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 8,
                        pointHoverBackgroundColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        mode: 'index',
                        intersect: false,
                    },
                    animation: {
                        duration: 1200,
                        easing: 'easeInOutBack'
                    },
                    scales: {
                        y: { grid: { color: gridColor }, beginAtZero: true },
                        x: { grid: { color: gridColor, drawBorder: false } }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: tooltipConfig
                    }
                }
            });
        }
    };

    // Initialize charts slightly delayed to ensure DOM is fully ready and visible
    setTimeout(() => renderCharts(30), 100);

    // Use debounce utility to handle window resize efficiently
    const handleResize = window.utils.debounce(() => {
        // Chart.js automatically handles resize, but if we needed custom logic
        // or re-fetching data on breakpoint changes, we would put it here.
        console.log('Window resized - debounced');
    }, 250);

    window.addEventListener('resize', handleResize);
});
