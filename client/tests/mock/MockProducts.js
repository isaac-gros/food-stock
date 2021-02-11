module.exports = [
    {
        id: 1,
        name: 'Banane',
        batchs: [
            {
                id: 1,
                quantity: 3,
                created_at: 1612976706,
                expired_at: 1613001906,
                category: {
                    id: 1,
                    name: 'Fruits',
                    average_expiry: 604800
                }
            }
        ]
    },
    {
        id: 2,
        name: 'Steak',
        batchs: [],
    },
    {
        id: 3,
        name: 'Truite',
        batchs: [
            {
                id: 2,
                quantity: 1,
                created_at: 1612976706,
                expired_at: 1613235906,
                category: {
                    id: 1,
                    name: 'Poisson',
                    average_expiry: 604800
                }
            }
        ]
    }
];