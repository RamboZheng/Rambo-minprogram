/**
 * 接口请求地址
 */

const HOST = 'https://www.baidu.com'; // 新测试环境

// 地址存储
const URL = {
    // 公共接口
    GET_PHONE_NUMBER: `${HOST}/wechat/getMiniPhoneAndLogin`, // 查询用户手机号
    GET_RANDOM_ID: `${HOST}/login/randomId`, // 生成用户临时id
    GET_AGENT_INFO: `${HOST}/broker/getBasicInfoForPc`, // 获取经纪人信息
    // 列表模块
    // 二手房
    GET_LIST_DATA: `${HOST}/house/list`, // 查询房源列表
    GET_CONDITION: `${HOST}/condition/all`, // 筛选条件列表
    GET_KEYWORD_LIST: `${HOST}/search/getSearchKeyword`, //获取二手房搜索提示

    SEARCH_BY_CODE: `${HOST}/condition/searchBycode`, //查询区域及地铁线商圈
    GET_HOUSE_DETAIL: `${HOST}/house/detail`, // 获取房源详情
    GET_HOUSE_RECOMMENDATION: `${HOST}/house/recommendation`, // 二手房推荐房源
    //二手房点评
    GET_HOUSE_COMMENTLIST: `${HOST}/evaluation/page`, // 二手房用户点评列表
    GET_HOUSE_COMMENTSAVE: `${HOST}/evaluation/save`, // 二手房用户点评提交
    GET_HOUSE_COMMENTPRAISE: `${HOST}/evaluation/praise`, // 二手房用户点评点赞
    GET_HOUSE_COMMENTUNPRAISE: `${HOST}/evaluation/undoPraise`, // 二手房用户点评取消点赞
    //租房
    GET_RENT_LIST_DATA: `${HOST}/rent/search/houseList`, // 查询房源列表
    GET_RENT_CONDITION: `${HOST}/condition/rent`, // 筛选条件列表

    GET_RENT_KEYWORD: `${HOST}/rent/search/suggestList`, //获取二手房搜索提示
    GET_RENT_SUGGEST_LIST: `${HOST}/rent/search/suggestList`, // 搜索推荐词
    GET_RENT_RECOMMEND_LIST: `${HOST}/rent/search/recommendList`, // 查询推荐列表
    GET_RENT_CANCEL_COLLECT: `${HOST}/rent/house/unCollect`, // 取消收藏
    GET_RENT_COLLECT: `${HOST}/rent/house/collect`, // 收藏房源
    //公寓
    GET_FLATS_LIST_DATA: `${HOST}/rent/apartment/list`, // 查询房源列表
    GET_FLATS_SEARCH_LIST: `${HOST}/rent/apartment/suggestList`, // 公寓搜索列表
    GET_BRANDS_CONDITION: `${HOST}/condition/brands`, // 筛选品牌列表
    GET_FLATS_KEYWORD: `${HOST}/rent/apartment/recommendList`, // 公寓搜索关键词
    GET_FLATS_CONDITION: `${HOST}/condition/apartment`, // 公寓筛选条件
    GET_FLATS_BRANDINFO: `${HOST}/rent/apartment/brandInfo`, // 查询公寓的品牌信息
    GET_FLATS_NONECONDITION: `${HOST}/condition/aptNonBrand`, // 公寓无品牌筛选条件
    GET_RENT_APARTMENT_DETAIL: `${HOST}/rent/apartment/detail`, // 公寓详情
    GET_RENT_APARTMENT_HOUSE_LLIST: `${HOST}/rent/apartment/houseList`, //公寓下面的房源
    GET_RENT_APARTMENT_HOUSE_DETAIL: `${HOST}/rent/apartment/apthouse/detail`, //公寓下面的房源
    GET_RENT_APARTMENT_SUBWAYGEO: `${HOST}/rent/apartment/subwayGeo`, //户型房所属公寓经纬度



    //小区
    COLLECT__HOUSE: `${HOST}/watch/gardenWatch`, //收藏小区
    CANCEL_COLLECT: `${HOST}/watch/gardenUnWatch`, //取消房源收藏
    ISGET_COLLECT__GARDEN: `${HOST}/watch/gardenIsWatch`, // 查询小区是否收藏
    CANCEL_ALL_COLLECT: `${HOST}/watch/gardenUnWatchByGardenIdList`, // 批量取消收藏（关注）小区
    GET_GARDEN_LIST: `${HOST}/garden/list`, // 小区列表页
    GET_GARDEN_DETAIL: `${HOST}/garden/detail`, // 小区详情页
    GET_GARDENS_NEARBY: `${HOST}/garden/nearbyGarden`, // 周边小区
    GET_GARDEN_RECOMMEND: `${HOST}/garden/recommendationByGardenId`, // 获取小区推荐房源以及tab
    GET_GARDEN_ROOM_RECOMMEND: `${HOST}/garden/getGardenHouseByGardenId`, // 通过tab获取小区推荐房源
    GET_GARDEN_RENTTAB: `${HOST}/rent/garden/rentHouseTab`, // 获取小区租房房源以及tab
    GET_GARDEN_RENTLIST: `${HOST}/rent/search/garden/subHouses`, // 通过tab获取小区租房房源
    GET_GARDEN_RECOMMENDATION: `${HOST}/garden/recommendation`, // 小区推荐房源

    //经纪人
    POST_COLLECT_BROKER: `${HOST}/watch/brokerWatch`, // 关注经纪人
    GET_BROKER_DETAIL: `${HOST}/broker/detail`, // 经纪人动态房源
    CANCEL_COLLECT_BROKER: `${HOST}/watch/brokerunwatch`, // 取消收藏（关注）该经纪人
    CANCEL_COLLECT_MUCH_BROKER: `${HOST}/watch/brokerunwatchByBrokerIdList`, // 批量取消收藏（关注）经纪人
    GET_BROKER_TREND: `${HOST}/broker/houseList`, // 经纪人动态房源
    ISGET_COLLECT_BROKER: `${HOST}/watch/brokerisWatch`, // 用户是否收藏该经纪人
    GET_BROKER_TREND_DETAIL: `${HOST}/broker/houseListBybrokerIdList`, //  经纪人动态详情



    GET_BROKER_COMMENT_LIST: `${HOST}/brokerEvaluation/page`, // 获取经纪人评价列表
    POST_BROKER_COMMENT: `${HOST}/brokerEvaluation/save`, //  新增对经纪人的评价
    GET_BROKER_TAG: `${HOST}/brokerEvaluation/label`, //  查询标签列表
    GET_BROKER_SCORE: `${HOST}/brokerEvaluation/score`, // 获取经纪人的评分



    //学校 
    GET_SCHOOL_LIST: `${HOST}/school/list`, // 学校列表
    GET_SCHOOL_NEARBY: `${HOST}/school/nearbySchool`, // 对口小区
    GET_SCHOOL_DETAIL: `${HOST}/school/detail`, // 学校详情页                
    GET_SCHOOL_RECOMMEND: `${HOST}/school/recommendation`, // 房源推荐
    ISCOLLECT_SCHOOL: `${HOST}/watch/schoolIsWatch`, // 该学校是否收藏
    COLLECT_SCHOOL: `${HOST}/watch/schoolWatch`, // 关注该学校
    CANCLE_COLLECT_SCHOOL: `${HOST}/watch/schoolUnWatch`, // 取消关注学校

    //详情模块
    GET_HOUSE_ANGEN: `${HOST}/house/brokerDetail`, // 获取经纪人
    UNCOLLECT_HOUSE: `${HOST}/watch/houseUnWatch`, // 取消收藏房源
    GET_GARDEN_NEARBY: `${HOST}/garden/nearbyGarden`, // 周边小区
    GET_COMPUTED_DISTANCE: `${HOST}/map/getTwopointsDistance`, // 通过两点的经纬度计算两点直线距离
    GET_CURRENT_GARDEN_HOUSE: `${HOST}/garden/getGardenHouse`,
    ISGET_COLLECT__HOUSE: `${HOST}/watch/houseIsWatch`,
    POST_COLLECT__HOUSE: `${HOST}/watch/houseWatch`,
    GET_RENT_HOUSE_DETAIL: `${HOST}/rent/house/detail`, // 租房房源详情
    GET_RENT_HOUSE_SIMILARS: `${HOST}/rent/search/house/similars/`, // 相似房源
    POST_RENT_HOUSE_COLLECT: `${HOST}/rent/house/collect`, // 租房收藏房源
    POST_RENT_HOUSE_UNCOLLECT: `${HOST}/rent/house/unCollect`, // 租房取消收藏
    GET_RENT_HOUSE_SUBWAY: `${HOST}/rent/house/subwayGeo`,
    GET_RENT_HOUSE_SHARE_DETAIL: `${HOST}/rent/shareHouse/detail`, //合租详情
    GET_RENT_HASWATCH_OPTION: `${HOST}/rent/house/hasCollect`, // 是否收藏
    //个人模块
    GET_LOGIN_SMS: `${HOST}/login/sms`, //获取验证码
    PHONE_LOGIN_BY_WECHAT: `${HOST}/wechat/getMiniPhoneAndLogin`, //授权手机号并登录的接口
    PHONE_LOGIN_BY_CODE: `${HOST}/login/miniInformation`, //手机验证码登录接口
    WECHAT_LOGIN: `${HOST}/wechat/miniLoginByCode`, //微信登录
    COLLECT_BROKER: `${HOST}/broker/brokerList`, // 个人中心收藏经纪人列表
    COLLECT_SCHOOL_: `${HOST}/watch/schoolWatch`, // 个人中心收藏学校列表
    COLLECT_HOUSELIST: `${HOST}/watch/houseList`, //个人中心收藏二手房列表
    COLLECT_GARDENLIST: `${HOST}/watch/gardenList`, //个人中心收藏小区列表
    COLLECT_RENTLIST: `${HOST}/rent/collect/list`, //个人中心收藏租房列表
    GET_ALL_FOOTPRINT: `${HOST}/watch/getAllFootprintWatch`, //二手房浏览记录
    GET_BLOCK_FOOTPRINT: `${HOST}/watch/getAllFootprintGardenWatch`, //小区浏览记录
    GET_RENT_FOOTPRINT: `${HOST}/rent/visitLogs/list`, //租房浏览记录
    CLEAR_ALL_FOOTPRINT: `${HOST}/watch/deleteAllFootprintWatch`, //清空浏览记录
    CLEAR_RENT_FOOTPRINT: `${HOST}/rent/visitLogs/delete`, //清空租房浏览记录
    LOGINOUT: `${HOST}/login/loginOut`, //退出登录
    // 首页位置
    GET_CURRENT_CITY: `${HOST}/city` //获取当前城市
};

// 缓存名称
const STORE = {
    BAIDU_TOKEN: 'BAIDU_TOKEN', //本地存储TOKEN
    BAIDU_RADOMID: 'BAIDU_RADOMID', //存储用户临时id
    BAIDU_USERINFO: 'BAIDU_USERINFO', // 本地存储用户信息
    BAIDU_LOCATEINFO: 'BAIDU_LOCATEINFO', // 存储用户位置信息
    BAIDU_WECHAT_USERINFO: 'BAIDU_WECHAT_USERINFO', // 本地存储微信用户信息
    RENT_HIS: 'RENT_HIS', // 租房搜索记录
    SECOND_HIS: 'SECOND_HIS', // 二手房搜索记录
    FLAT_HIS: 'FLAT_HIS', // 公寓搜索记录
    SCHOOL_HIS: 'SCHOOL_HIS', // 学校搜索记录
    GARDEN_HIS: 'GARDEN_HIS', // 小区搜索记录
    LOGIN_CODE: 'LOGIN_CODE', // 缓存code
    FOOT_PRINTS: 'FOOT_PRINTS', // 缓存浏览足迹
    SET_CITY: {} // 存放当前地址
};
module.exports = {
    URL: URL,
    STORE: STORE
};