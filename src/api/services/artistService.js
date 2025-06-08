import { saveToLocal, loadFromLocal } from './storage.js';

// 模拟歌手数据
const mockArtists = [
    {
        id: 1,
        name: '周杰伦',
        avatar: '/src/assets/images/artists/jay.jpg',
        description: '华语流行乐坛天王',
        category: 'mainland',
        alias: 'Jay Chou',
        songCount: 150,
        albumCount: 14,
        mvCount: 50,
        biography: '周杰伦（Jay Chou），1979年1月18日出生于台湾省新北市，中国台湾流行乐男歌手、音乐人、演员、导演、编剧，毕业于淡江中学。2000年发行首张个人专辑《Jay》。2001年发行的专辑《范特西》奠定其融合中西方音乐的风格。2002年举行"The One"世界巡回演唱会。2003年成为美国《时代周刊》封面人物。',
        hotSongs: [
            { id: 101, name: '稻香', album: '魔杰座' },
            { id: 102, name: '青花瓷', album: '我很忙' },
            { id: 103, name: '七里香', album: '七里香' },
            { id: 104, name: '晴天', album: '叶惠美' },
            { id: 105, name: '告白气球', album: '周杰伦的床边故事' }
        ],
        albums: [
            { id: 201, name: '周杰伦的床边故事', cover: '/src/assets/images/albums/jay1.jpg', year: '2016' },
            { id: 202, name: '魔杰座', cover: '/src/assets/images/albums/jay2.jpg', year: '2008' },
            { id: 203, name: '叶惠美', cover: '/src/assets/images/albums/jay3.jpg', year: '2003' }
        ],
        mvs: [
            { id: 301, name: '告白气球', cover: '/src/assets/images/mvs/jay1.jpg', publishTime: '2016-07-15' },
            { id: 302, name: '青花瓷', cover: '/src/assets/images/mvs/jay2.jpg', publishTime: '2007-11-02' },
            { id: 303, name: '稻香', cover: '/src/assets/images/mvs/jay3.jpg', publishTime: '2008-10-15' }
        ]
    },
    {
        id: 2,
        name: '林俊杰',
        avatar: '/src/assets/images/artists/jj.jpg',
        description: '新加坡著名歌手、词曲创作人',
        category: 'hktw',
        alias: 'JJ Lin',
        songCount: 120,
        albumCount: 12,
        mvCount: 40,
        biography: '林俊杰（JJ Lin），1981年3月27日出生于新加坡，华语流行乐男歌手、词曲创作人、音乐制作人，毕业于圣尼各拉斯理工学院。2003年发行首张创作专辑《乐行者》。2004年签约华纳唱片，发行专辑《第二天堂》，其中歌曲《江南》获得第15届台湾金曲奖最佳新人奖。',
        hotSongs: [
            { id: 106, name: '可惜没如果', album: '新地球' },
            { id: 107, name: '那些你很冒险的梦', album: '学不会' },
            { id: 108, name: '江南', album: '第二天堂' },
            { id: 109, name: '曹操', album: '曹操' },
            { id: 110, name: '修炼爱情', album: '因你而在' }
        ],
        albums: [
            { id: 204, name: '新地球', cover: '/src/assets/images/albums/jj1.jpg', year: '2014' },
            { id: 205, name: '因你而在', cover: '/src/assets/images/albums/jj2.jpg', year: '2013' },
            { id: 206, name: '曹操', cover: '/src/assets/images/albums/jj3.jpg', year: '2006' }
        ],
        mvs: [
            { id: 304, name: '可惜没如果', cover: '/src/assets/images/mvs/jj1.jpg', publishTime: '2014-12-12' },
            { id: 305, name: '那些你很冒险的梦', cover: '/src/assets/images/mvs/jj2.jpg', publishTime: '2013-03-09' },
            { id: 306, name: '修炼爱情', cover: '/src/assets/images/mvs/jj3.jpg', publishTime: '2013-02-14' }
        ]
    },
    {
        id: 3,
        name: 'Taylor Swift',
        avatar: '/src/assets/images/artists/taylor.jpg',
        description: '美国流行音乐、乡村音乐创作歌手',
        category: 'western',
        alias: '',
        songCount: 200,
        albumCount: 10,
        mvCount: 45,
        biography: 'Taylor Swift，1989年12月13日出生于美国宾夕法尼亚州，美国流行音乐、乡村音乐创作歌手、演员。2006年发行首张个人专辑《Taylor Swift》，并凭借该专辑获得第43届美国乡村音乐协会奖年度最佳新人奖。2008年发行第二张专辑《Fearless》，该专辑获得第52届格莱美奖最佳专辑奖。',
        hotSongs: [
            { id: 111, name: 'Love Story', album: 'Fearless' },
            { id: 112, name: 'Blank Space', album: '1989' },
            { id: 113, name: 'Shake It Off', album: '1989' },
            { id: 114, name: 'You Belong with Me', album: 'Fearless' },
            { id: 115, name: 'Bad Blood', album: '1989' }
        ],
        albums: [
            { id: 207, name: '1989', cover: '/src/assets/images/albums/taylor1.jpg', year: '2014' },
            { id: 208, name: 'Red', cover: '/src/assets/images/albums/taylor2.jpg', year: '2012' },
            { id: 209, name: 'Fearless', cover: '/src/assets/images/albums/taylor3.jpg', year: '2008' }
        ],
        mvs: [
            { id: 307, name: 'Blank Space', cover: '/src/assets/images/mvs/taylor1.jpg', publishTime: '2014-11-10' },
            { id: 308, name: 'Shake It Off', cover: '/src/assets/images/mvs/taylor2.jpg', publishTime: '2014-08-18' },
            { id: 309, name: 'Bad Blood', cover: '/src/assets/images/mvs/taylor3.jpg', publishTime: '2015-05-17' }
        ]
    },
    {
        id: 4,
        name: 'Ariana Grande',
        avatar: '/src/assets/images/artists/ariana.jpg',
        description: '美国流行音乐女歌手、演员',
        category: 'featured',
        alias: '',
        songCount: 110,
        albumCount: 6,
        mvCount: 30,
        biography: 'Ariana Grande，1993年6月26日出生于美国佛罗里达州，美国流行音乐女歌手、演员。2008年开始在百老汇音乐剧《13》中饰演Charlotte而出道。2013年发行首张个人专辑《Yours Truly》，并以此专辑在美国公告牌二百强专辑榜上获得第一名。',
        hotSongs: [
            { id: 116, name: 'Thank U, Next', album: 'Thank U, Next' },
            { id: 117, name: '7 Rings', album: 'Thank U, Next' },
            { id: 118, name: 'Side to Side', album: 'Dangerous Woman' },
            { id: 119, name: 'Break Free', album: 'My Everything' },
            { id: 120, name: 'Problem', album: 'My Everything' }
        ],
        albums: [
            { id: 210, name: 'Thank U, Next', cover: '/src/assets/images/albums/ariana1.jpg', year: '2019' },
            { id: 211, name: 'Sweetener', cover: '/src/assets/images/albums/ariana2.jpg', year: '2018' },
            { id: 212, name: 'Dangerous Woman', cover: '/src/assets/images/albums/ariana3.jpg', year: '2016' }
        ],
        mvs: [
            { id: 310, name: 'Thank U, Next', cover: '/src/assets/images/mvs/ariana1.jpg', publishTime: '2018-11-30' },
            { id: 311, name: '7 Rings', cover: '/src/assets/images/mvs/ariana2.jpg', publishTime: '2019-01-18' },
            { id: 312, name: 'Side to Side', cover: '/src/assets/images/mvs/ariana3.jpg', publishTime: '2016-08-30' }
        ]
    },
    {
        id: 5,
        name: '米津玄師',
        avatar: '/src/assets/images/artists/yonezu.jpg',
        description: '日本音乐人、创作歌手、插画家',
        category: 'featured',
        alias: 'Kenshi Yonezu',
        songCount: 80,
        albumCount: 5,
        mvCount: 25,
        biography: '米津玄師（Kenshi Yonezu），1991年3月10日出生于日本德岛县，日本音乐人、创作歌手、插画家。2009年以"Hachi"为名义投稿Vocaloid歌曲。2012年以本名发行首张专辑《diorama》。2015年发行第三张专辑《Bremen》，并凭借该专辑获得第57届日本唱片大奖优秀专辑奖。',
        hotSongs: [
            { id: 121, name: 'Lemon', album: 'Lemon' },
            { id: 122, name: 'Flamingo', album: 'Flamingo / TEENAGE RIOT' },
            { id: 123, name: 'LOSER', album: 'BOOTLEG' },
            { id: 124, name: 'ピースサイン', album: 'ピースサイン' },
            { id: 125, name: '灰色と青', album: 'BOOTLEG' }
        ],
        albums: [
            { id: 213, name: 'STRAY SHEEP', cover: '/src/assets/images/albums/yonezu1.jpg', year: '2020' },
            { id: 214, name: 'BOOTLEG', cover: '/src/assets/images/albums/yonezu2.jpg', year: '2017' },
            { id: 215, name: 'Bremen', cover: '/src/assets/images/albums/yonezu3.jpg', year: '2015' }
        ],
        mvs: [
            { id: 313, name: 'Lemon', cover: '/src/assets/images/mvs/yonezu1.jpg', publishTime: '2018-02-27' },
            { id: 314, name: 'Flamingo', cover: '/src/assets/images/mvs/yonezu2.jpg', publishTime: '2018-10-31' },
            { id: 315, name: 'LOSER', cover: '/src/assets/images/mvs/yonezu3.jpg', publishTime: '2016-09-23' }
        ]
    },
    {
        id: 6,
        name: 'BTS',
        avatar: '/src/assets/images/artists/bts.jpg',
        description: '韩国男子音乐组合',
        category: 'korean',
        alias: '방탄소년단',
        songCount: 130,
        albumCount: 9,
        mvCount: 35,
        biography: 'BTS（防弹少年团），韩国男子音乐组合，由金南俊、金硕珍、闵玧其、郑号锡、朴智旻、金泰亨、田柾国七名成员组成。2013年6月13日以单曲《No More Dream》正式出道。2018年5月，凭借专辑《LOVE YOURSELF 轉 Tear》获得美国公告牌200榜冠军。',
        hotSongs: [
            { id: 126, name: 'Dynamite', album: 'Dynamite' },
            { id: 127, name: 'Boy With Luv', album: 'Map of the Soul: Persona' },
            { id: 128, name: 'DNA', album: 'LOVE YOURSELF 承 Her' },
            { id: 129, name: 'FAKE LOVE', album: 'LOVE YOURSELF 轉 Tear' },
            { id: 130, name: 'IDOL', album: 'LOVE YOURSELF 結 Answer' }
        ],
        albums: [
            { id: 216, name: 'BE', cover: '/src/assets/images/albums/bts1.jpg', year: '2020' },
            { id: 217, name: 'Map of the Soul: 7', cover: '/src/assets/images/albums/bts2.jpg', year: '2020' },
            { id: 218, name: 'Map of the Soul: Persona', cover: '/src/assets/images/albums/bts3.jpg', year: '2019' }
        ],
        mvs: [
            { id: 316, name: 'Dynamite', cover: '/src/assets/images/mvs/bts1.jpg', publishTime: '2020-08-21' },
            { id: 317, name: 'Boy With Luv', cover: '/src/assets/images/mvs/bts2.jpg', publishTime: '2019-04-12' },
            { id: 318, name: 'DNA', cover: '/src/assets/images/mvs/bts3.jpg', publishTime: '2017-09-18' }
        ]
    }
];

// 获取歌手列表
export async function getArtistList() {
    // 简化版歌手列表，不包含详细信息
    const simplifiedList = mockArtists.map(artist => ({
        id: artist.id,
        name: artist.name,
        avatar: artist.avatar,
        description: artist.description,
        category: artist.category
    }));
    
    return {
        success: true,
        data: simplifiedList
    };
}

// 获取歌手详情
export async function getArtistDetail(artistId) {
    const artist = mockArtists.find(a => a.id === parseInt(artistId));
    
    if (!artist) {
        return {
            success: false,
            message: '未找到该歌手信息'
        };
    }
    
    return {
        success: true,
        data: artist
    };
}