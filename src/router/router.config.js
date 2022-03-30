/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
	path: '/',
	component: () => import('@/views/layouts/index'),
	redirect: '/home',
	meta: {
		title: '首页',
		keepAlive: false
	},
	
	children: [{
		path: '/nullPage',
		name: 'NullPage',
		component: () => import('@/views/home/nullPage'),
		meta: {
			title: '出错啦！',
			keepAlive: false,
			tabBar:false,
			navBar:true
		}
	},{
			path: '/home',
			name: 'Home',
			component: () => import('@/views/home/index'),
			meta: {
				title: '首页',
				keepAlive: false,
				tabBar:true,  //是否显示底部标签栏 true 显示 false不显示
				navBar:false, //是否显示顶部导航栏 true 显示 false不显示
				//requireAuth:true //是否需要登录才能进
			}
		},
		{
			path: '/register',
			name: 'Register',
			component: () => import('@/views/home/register'),
			meta: {
				title: '注册',
				keepAlive: false,
				tabBar:false,
				navBar:false
			}
		},
		{
			path: '/login',
			name: 'Login',
			component: () => import('@/views/home/login'),
			meta: {
				title: '登录',
				keepAlive: false,
				tabBar:false,
				navBar:false
			}
		},
		{
			path: '/search',
			name: 'Search',
			component: () => import('@/views/search/Search'),
			meta: {
				title: '搜索商品',
				keepAlive: false,
				tabBar:true,
				navBar:false
			}
		},
		{
			path: '/productDetails',
			name: 'ProductDetails',
			component: () => import('@/views/product/ProductDetails'),
			meta: {
				title: '商品详情',
				keepAlive: false,
				tabBar:false,
				navBar:true
			}
		},
		{
			path: '/ProductList',
			name: 'ProductList',
			component: () => import('@/views/product/ProductList'),
			meta: {
				title: '全部商品',
				keepAlive: false,
				tabBar:true,
				navBar:false
			}
		},{
			path: '/category',
			name: 'category',
			component: () => import('@/views/category/category'),
			meta: {
				title: '商品分类',
				keepAlive: false,
				tabBar:true,
				navBar:true
			}
		},{
			path: '/user',
			name: 'User',
			component: () => import('@/views/user/User'),
			meta: {
				title: '个人中心',
				keepAlive: false,
				tabBar:true,
				navBar:false,
				requireAuth:true 
			}
		},{
			path: '/user/foot',
			name: 'Foot',
			component: () => import('@/views/collect/collect'),
			meta: {
				title: '我的足迹',
				keepAlive: false,
				tabBar:false,
				navBar:false
			}
		},{
			path: '/user/collect',
			name: 'Collect',
			component: () => import('@/views/collect/collect'),
			meta: {
				title: '我的收藏',
				keepAlive: false,
				tabBar:false,
				navBar:false
			}
		},{
			path: '/cart',
			name: 'Cart',
			component: () => import('@/views/cart/Cart'),
			meta: {
				title: '购物车',
				keepAlive: false,
				tabBar:false,
				navBar:true,
				requireAuth:true,
				canSearch:false
			}
		},{
			path: '/loginTips',
			name: 'LoginTips',
			component: () => import('@/views/home/loginTips'),
			meta: {
				title: '请登录',
				keepAlive: false,
				tabBar:true,
				navBar:false
			}
		},{
			path: '/user/orderDetail',
			name: 'orderDetail',
			component: () => import('@/views/order/orderDetail'),
			meta: {
				title: '订单详情',
				keepAlive: false,
				tabBar:false,
				navBar:true,
				requireAuth:true,
				canSearch:false
			}
		},{
			path: '/user/order',
			name: 'Order',
			component: () => import('@/views/order/Order'),
			meta: {
				title: '我的订单',
				keepAlive: false,
				tabBar:false,
				navBar:true,
				requireAuth:true,
				canSearch:false
			}
		},{
			path: '/user/orderComment',
			name: 'OrderComment',
			component: () => import('@/views/comment/userComment'),
			meta: {
				title: '用户评论',
				keepAlive: false,
				tabBar:false,
				navBar:true,
				requireAuth:true,
				canSearch:false
			}
		},{
			path: '/user/address',
			name: 'Address',
			component: () => import('@/views/contactList/contactList'),
			meta: {
				title: '我的联系人',
				keepAlive: false,
				tabBar:false,
				navBar:true,
				requireAuth:true,
				canSearch:false
			}
		},{
			path: '/newContact',
			name: 'NewContact',
			component: () => import('@/views/contactList/newContact'),
			meta: {
				title: '新增联系人',
				keepAlive: false,
				tabBar:false,
				navBar:true,
				requireAuth:true,
				canSearch:false
			}
		},{
			path: '/createOrder',
			name: 'CreateOrder',
			component: () => import('@/views/order/createOrder'),
			meta: {
				title: '创建订单',
				keepAlive: false,
				tabBar:false,
				navBar:true,
				requireAuth:true,
				canSearch:false
			}
		},{
			path: '/paySuccess',
			name: 'PaySuccess',
			component: () => import('@/views/order/paySuccess'),
			meta: {
				title: '支付成功',
				keepAlive: false,
				tabBar:false,
				navBar:false,
				requireAuth:true,
				canSearch:false
			}
		},{
			path: '/recharge',
			name: 'Recharge',
			component: () => import('@/views/user/recharge'),
			meta: {
				title: '我的余额',
				keepAlive: false,
				tabBar:true,
				navBar:true,
				requireAuth:true,
				canSearch:false
			}
		},{
			path: '/comment',
			name: 'Comment',
			component: () => import('@/views/comment/comment'),
			meta: {
				title: '全部评论',
				keepAlive: false,
				tabBar:true,
				navBar:true,
				requireAuth:false,
				canSearch:false
			}
		},
	]
}]
