// MV数据
const mvData = {
    featured: [
        { id: 1, title: '精选MV1', cover: '/src/assets/images/default-cover.jpg', playCount: 150 },
        { id: 2, title: '精选MV2', cover: '/src/assets/images/default-cover.jpg', playCount: 120 },
        { id: 3, title: '精选MV3', cover: '/src/assets/images/default-cover.jpg', playCount: 180 },
        { id: 4, title: '精选MV4', cover: '/src/assets/images/default-cover.jpg', playCount: 90 },
        { id: 5, title: '精选MV5', cover: '/src/assets/images/default-cover.jpg', playCount: 200 }
    ],
    mainland: [
        { id: 6, title: '内地MV1', cover: '/src/assets/images/default-cover.jpg', playCount: 130 },
        { id: 7, title: '内地MV2', cover: '/src/assets/images/default-cover.jpg', playCount: 110 },
        { id: 8, title: '内地MV3', cover: '/src/assets/images/default-cover.jpg', playCount: 160 },
        { id: 9, title: '内地MV4', cover: '/src/assets/images/default-cover.jpg', playCount: 140 },
        { id: 10, title: '内地MV5', cover: '/src/assets/images/default-cover.jpg', playCount: 170 }
    ],
    hktw: [
        { id: 11, title: '港台MV1', cover: '/src/assets/images/default-cover.jpg', playCount: 140 },
        { id: 12, title: '港台MV2', cover: '/src/assets/images/default-cover.jpg', playCount: 130 },
        { id: 13, title: '港台MV3', cover: '/src/assets/images/default-cover.jpg', playCount: 150 },
        { id: 14, title: '港台MV4', cover: '/src/assets/images/default-cover.jpg', playCount: 120 },
        { id: 15, title: '港台MV5', cover: '/src/assets/images/default-cover.jpg', playCount: 160 }
    ],
    western: [
        { id: 16, title: '欧美MV1', cover: '/src/assets/images/default-cover.jpg', playCount: 110 },
        { id: 17, title: '欧美MV2', cover: '/src/assets/images/default-cover.jpg', playCount: 100 },
        { id: 18, title: '欧美MV3', cover: '/src/assets/images/default-cover.jpg', playCount: 130 },
        { id: 19, title: '欧美MV4', cover: '/src/assets/images/default-cover.jpg', playCount: 90 },
        { id: 20, title: '欧美MV5', cover: '/src/assets/images/default-cover.jpg', playCount: 140 }
    ],
    korean: [
        { id: 21, title: '韩国MV1', cover: '/src/assets/images/default-cover.jpg', playCount: 125 },
        { id: 22, title: '韩国MV2', cover: '/src/assets/images/default-cover.jpg', playCount: 115 },
        { id: 23, title: '韩国MV3', cover: '/src/assets/images/default-cover.jpg', playCount: 145 },
        { id: 24, title: '韩国MV4', cover: '/src/assets/images/default-cover.jpg', playCount: 105 },
        { id: 25, title: '韩国MV5', cover: '/src/assets/images/default-cover.jpg', playCount: 155 }
    ]
};

// 获取MV列表
export async function getMvList(category) {
    return mvData[category] || mvData.featured;
} 