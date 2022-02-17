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
				navBar:false
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
			path: '/cart',
			name: 'Cart',
			component: () => import('@/views/cart/Cart'),
			meta: {
				title: '购物车',
				keepAlive: false,
				tabBar:true,
				navBar:false,
				requireAuth:true 
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
		},
	]
}]
