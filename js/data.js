/**
 * Mock Data Module
 */

const mockData = {
    // Raw events data to be processed by our logic engine
    rawTrafficEvents: [
        { date: '2023-10-01', source: 'Direct', visitors: 1200 },
        { date: '2023-10-01', source: 'Organic Search', visitors: 3500 },
        { date: '2023-10-01', source: 'Social', visitors: 800 },
        { date: '2023-10-01', source: 'Referral', visitors: 400 },
        { date: '2023-10-02', source: 'Direct', visitors: 1100 },
        { date: '2023-10-02', source: 'Organic Search', visitors: 3200 },
        { date: '2023-10-02', source: 'Social', visitors: 950 },
        { date: '2023-10-02', source: 'Referral', visitors: 450 },
        { date: '2023-10-03', source: 'Direct', visitors: 1300 },
        { date: '2023-10-03', source: 'Organic Search', visitors: 4100 },
        { date: '2023-10-03', source: 'Social', visitors: 1050 },
        { date: '2023-10-03', source: 'Referral', visitors: 500 },
        { date: '2023-10-04', source: 'Direct', visitors: 1250 },
        { date: '2023-10-04', source: 'Organic Search', visitors: 3800 },
        { date: '2023-10-04', source: 'Social', visitors: 850 },
        { date: '2023-10-04', source: 'Referral', visitors: 420 },
        { date: '2023-10-05', source: 'Direct', visitors: 1400 },
        { date: '2023-10-05', source: 'Organic Search', visitors: 4500 },
        { date: '2023-10-05', source: 'Social', visitors: 1200 },
        { date: '2023-10-05', source: 'Referral', visitors: 600 }
    ],

    // Raw revenue data
    rawRevenueData: [
        { month: 'May', product: 'Starter', amount: 15000 },
        { month: 'May', product: 'Pro', amount: 35000 },
        { month: 'May', product: 'Enterprise', amount: 40000 },
        { month: 'Jun', product: 'Starter', amount: 16000 },
        { month: 'Jun', product: 'Pro', amount: 42000 },
        { month: 'Jun', product: 'Enterprise', amount: 45000 },
        { month: 'Jul', product: 'Starter', amount: 18000 },
        { month: 'Jul', product: 'Pro', amount: 50000 },
        { month: 'Jul', product: 'Enterprise', amount: 45000 },
        { month: 'Aug', product: 'Starter', amount: 20000 },
        { month: 'Aug', product: 'Pro', amount: 58000 },
        { month: 'Aug', product: 'Enterprise', amount: 50000 },
        { month: 'Sep', product: 'Starter', amount: 22000 },
        { month: 'Sep', product: 'Pro', amount: 65000 },
        { month: 'Sep', product: 'Enterprise', amount: 55000 }
    ],
    
    // User activity distribution
    rawActivityData: [
        { hour: '00:00', active_users: 150 },
        { hour: '04:00', active_users: 80 },
        { hour: '08:00', active_users: 450 },
        { hour: '12:00', active_users: 1200 },
        { hour: '16:00', active_users: 1400 },
        { hour: '20:00', active_users: 850 }
    ]
};

window.mockData = mockData;
