module.exports = {
  title: `Donghee Kim`,
  description: `일상 속 개발록`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://dev-bomdong.github.io/`,
  ogImage: `/blog-thumbnail.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `dev-bomdong/dev-bomdong.github.io`, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: 'G-ZZQWRB4MK9', //  Google Analytics Tracking ID
  author: {
    name: `Donghee Kim`,
    bio: {
      role: `프론트엔드 개발자`,
      description: 'Product Manager with Frontend Development Background',
      thumbnail: 'profile.png', //'sample.png', // Path to the image in the 'asset' folder
    },
    social: {
      github: 'https://github.com/dev-bomdong',
      linkedIn: 'https://www.linkedin.com/in/donghee-kim-66a935264/',
      // email: 'dongdh02076@gmail.com',
      post: 'https://portfolio-donghee-kim.vercel.app/',
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: 'https://github.com/dev-bomdong',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2022.08 ~',
        activity: '샤플앤컴퍼니',
        links: {
          // post: '/gatsby-starter-zoomkoding-introduction',
          // github: 'https://github.com/zoomkoding/zoomkoding-gatsby-blog',
          // demo: 'https://www.hadaworks.com/',
        },
      },
      {
        date: '2021.12 - 2022.07',
        activity: '두번째',
        links: {
          // post: '/gatsby-starter-zoomkoding-introduction',
          // github: 'https://github.com/zoomkoding/zoomkoding-gatsby-blog',
          demo: 'https://www.houstep.co.kr/',
        },
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      // {
      //   title: '개발 블로그 테마 개발',
      //   description:
      //     '개발 블로그를 운영하는 기간이 조금씩 늘어나고 점점 많은 생각과 경험이 블로그에 쌓아가면서 제 이야기를 담고 있는 블로그를 직접 만들어보고 싶게 되었습니다. 그동안 여러 개발 블로그를 보면서 좋았던 부분과 불편했던 부분들을 바탕으로 레퍼런스를 참고하여 직접 블로그 테마를 만들게 되었습니다.',
      //   techStack: ['gatsby', 'react'],
      //   thumbnailUrl: 'blog.png',
      //   links: {
      //     post: '/gatsby-starter-zoomkoding-introduction',
      //     github: 'https://github.com/zoomkoding/zoomkoding-gatsby-blog',
      //     demo: 'https://www.zoomkoding.com',
      //   },
      // },
    ],
  },
};
