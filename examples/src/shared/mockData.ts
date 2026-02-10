export type MockProduct = {
    id: string;
    title: string;
    body: string;
    brand: string;
    color: string;
    price: number;
    created_at: string; // YYYY-MM-DD
    delivery_date: string; // YYYY-MM-DD
    in_stock: 'yes' | 'no';
};

export type MockCity = {
    id: string;
    city: string;
    lat: number;
    lng: number;
};

function pad2(n: number): string {
    return `${n}`.padStart(2, '0');
}

function dateYYYYMMDD(d: Date): string {
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

export function buildMockProducts(count = 80): MockProduct[] {
    const brands = ['Acme', 'Contoso', 'Globex', 'Initech', 'Umbrella', 'Soylent'];
    const colors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow'];

    const today = new Date();
    const items: MockProduct[] = [];

    for (let i = 0; i < count; i++) {
        const brand = brands[i % brands.length];
        const color = colors[(i * 3) % colors.length];
        const price = 10 + ((i * 7) % 190);

        const created = new Date(today);
        created.setDate(created.getDate() - ((i * 2) % 45));

        const delivery = new Date(today);
        delivery.setDate(delivery.getDate() + ((i * 3) % 20));

        const inStock = (i % 4 === 0) ? 'no' : 'yes';

        items.push({
            id: `p_${i + 1}`,
            title: `${brand} ${color} Product #${i + 1}`,
            body: `Demo product used in Needletail UI examples. Brand=${brand}, Color=${color}, Price=${price}.`,
            brand: brand,
            color: color,
            price: price,
            created_at: dateYYYYMMDD(created),
            delivery_date: dateYYYYMMDD(delivery),
            in_stock: inStock,
        });
    }

    return items;
}

export function buildMockCities(): MockCity[] {
    return [
        {id: 'c_ams', city: 'Amsterdam', lat: 52.3676, lng: 4.9041},
        {id: 'c_rtm', city: 'Rotterdam', lat: 51.9244, lng: 4.4777},
        {id: 'c_utr', city: 'Utrecht', lat: 52.0907, lng: 5.1214},
        {id: 'c_dha', city: 'Den Haag', lat: 52.0705, lng: 4.3007},
        {id: 'c_ehv', city: 'Eindhoven', lat: 51.4416, lng: 5.4697},
        {id: 'c_grn', city: 'Groningen', lat: 53.2194, lng: 6.5665},
        {id: 'c_mst', city: 'Maastricht', lat: 50.8514, lng: 5.6900},
        {id: 'c_nmg', city: 'Nijmegen', lat: 51.8126, lng: 5.8372},
        {id: 'c_arn', city: 'Arnhem', lat: 51.9851, lng: 5.8987},
        {id: 'c_lei', city: 'Leiden', lat: 52.1601, lng: 4.4970},
    ];
}

