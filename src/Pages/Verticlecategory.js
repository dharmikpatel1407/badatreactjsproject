import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import SliderCategory from "../Component/SliderCategory";
import SliderCategoryNew from "../Component/SliderCategoryNew";
import { getVerticalCategory, getProducts, getDistrict, getSubCategory } from "../AppApi";
import { Paper, Fab } from "@material-ui/core";
import { Helmet } from "react-helmet";
import ProductCard from "../Component/ProductCard";
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Drawer,
	Button,
} from "@material-ui/core";
import ShareIcon from '@mui/icons-material/Share';
import Modal from '@material-ui/core/Modal';

import {
	FacebookShareButton,
	PinterestShareButton,
	TelegramShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	FacebookIcon,
	PinterestIcon,
	InstapaperIcon,
	InstapaperShareButton,
	TelegramIcon,
	TwitterIcon,
	WhatsappIcon,
	LinkedinShareButton,
	EmailShareButton,
	LinkedinIcon,
	EmailIcon,
} from "react-share";
// import { getCategory, getSubCategory, getVerticalCategory } from "../AppApi";
import FilterListIcon from "@material-ui/icons/FilterList";
import NoDataFound from "../Component/NoDataFound";
import "../AppAsset/CSS/Product.css";
import { getCategory, getState } from "../AppApi";
import InfiniteScroll from 'react-infinite-scroll-component'
import {
	ROUTE_SUBCATEGORIES,
	ROUTE_ALL_PRODUCT,
	ENDPOINT_GET_SUB_CATEGORIES_BANNER,
	ROUTE_VERTICLE_CATEGORIES,
} from "../Constant";
import Product from "../Component/Product";
import Banners from "../Component/Banners";
import {
	loginPopUp,
	checkSkip,
	checkLogin,
	checkBadatExpiration,
	getCatId,
	getSelectNameSub,
} from "../Util";
import "../AppAsset/CSS/VerticalCategory.css";
import Footer from "../Component/Footer";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
// const query = window.location.href?.split("cat=")[1]
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};
let total_pages;
class VerticleCategory extends Component {
	constructor() {
		super();
		this.state = {
			load: true,
			data: [],
			openProductScroll: false,

			productData: [],
			verticleCategories: null,
			state: null,
			district: null,
			price: null,
			verticalCategoryList: [],
			districtList: [],
			drawer: false,
			sort: [],
			sortValue: [],
			sortOrder: [],
			sortOrderValue: [],
			params: { page: 1 },
			districtValue: [],
			dataList: '',
			type: 'verticalCategory',
			openProductList: false,
			subcategoryList: [],
			catId: window.location.href?.split("cat=")[1]?.split("%20")?.join(" ")
		};
		this.handlePageClick = this.handlePageClick.bind(this);

	}

	// componentDidUpdate = async (prevProps) => {
	// 	const id = window.location.href.slice(
	// 		window.location.href.lastIndexOf("/") + 1
	// 	);
	// 	// const response = await getSubCategory(1)
	// 	const res = await getVerticalCategory(id);
	// 	this.setState({ load: false, data: res.data.data });
	// 	const params = {
	// 		subcategory_id: id,
	// 		page: 1,
	// 	};

	// 	// console.log(response);

	// 	this.setState({ load: true, params });
	// 	const prod = await getProducts(params);
	// 	const tempState = await getState();
	// 	this.setState({
	// 		load: false,
	// 		// subcategoryList: response.data.data,
	// 		data: res.data.data,
	// 		// productData: prod.data.data.data,
	// 		stateData: (tempState && tempState) || [],
	// 		productData: (prod.data && prod.data.data) || prod.data.data || {},
	// 	});
	// 	total_pages = this.state.productData && this.state.productData.last_page
	// 	if (this.state.productData && this.state.productData.data.length) {
	// 		let lists = [...this.state.dataList, ...this.state.productData.data]
	// 		this.setState({ dataList: lists })

	// 		this.receivedData();

	// 	}
	//   };

	componentDidMount = async () => {
		const id = window.location.href.slice(
			window.location.href.lastIndexOf("/") + 1
		);
		const catId = getCatId(this.state.catId)
		const response = await getSubCategory(catId)
		const res = await getVerticalCategory(id);
		this.setState({ load: false, data: res.data.data });
		const params = {
			subcategory_id: id,
			page: 1,
		};

		console.log(response);

		this.setState({ load: true, params });
		const prod = await getProducts(params);
		const tempState = await getState();
		this.setState({
			load: false,
			subcategoryList: response.data.data,
			data: res.data.data,
			// productData: prod.data.data.data,
			stateData: (tempState && tempState) || [],
			productData: (prod.data && prod.data.data) || prod.data.data || {},
		});
		total_pages = this.state.productData && this.state.productData.last_page
		if (this.state.productData && this.state.productData.data.length) {
			let lists = [...this.state.dataList, ...this.state.productData.data]
			this.setState({ dataList: lists })

			this.receivedData();

		}

	};
	// componentDidMount = async () => {
	// 	const categoryTempData = await getCategory();
	// 	const tempState = await getState();
	// 	const id = window.location.href.slice(
	// 	  window.location.href.lastIndexOf("/") + 1
	// 	);
	// 	const params = {
	// 		subcategory_id: id,
	// 	  page: 1,
	// 	};
	// 	const prod = await getProducts(params);

	// 	this.setState({
	// 	  categorydata:
	// 		categoryTempData &&
	// 		  categoryTempData.data &&
	// 		  categoryTempData.data.data &&
	// 		  categoryTempData.data.data &&
	// 		  categoryTempData.data.data.length > 0
	// 		  ? categoryTempData.data.data
	// 		  : [],
	// 		  load: false,
	// 	  stateData: (tempState && tempState) || [],
	// 	  productData: (prod.data && prod.data.data) || prod.data.data || {},

	// 	});
	// 	if(this.state.productData && this.state.productData.data.length){
	// 	let lists =[...this.state.dataList, ...this.state.productData.data]
	// 	this.setState({dataList: lists})}

	//    this.receivedData();

	//   };

	receivedData() {
		const list = this.state.dataList;

		this.setState({
			pageCount: this.state.productData.last_page,
			prodData: list.map((pd) => <ProductCard data={pd} />),

		})
	}
	onClickHandle = (id, q) => {
		const query = q?.split("cat=")[1];
		console.log(query);
		const tempString = `vertical=${id}&`;
		this.props.history.push(`/${ROUTE_ALL_PRODUCT}/${tempString}cat=${query}`);
	};


	onClickSubCatHandle = (id, catId) => {
		const query = getSelectNameSub(catId) 
		// const catIdUrl = getCatId(this.state.catId)
		// console.log(catId, "cccc");

		// console.log(this.state.catId);
		this.props.history.push(`/${ROUTE_VERTICLE_CATEGORIES}/${id}?cat=${query}`);
		window.location.reload()
	  };

	onClickCategoryHandle = async (id, query) => {
		this.props.history.push(`/${ROUTE_SUBCATEGORIES}/${id}?cat=${query}`);
	};

	pageChangeCallback = async (id) => {
		const params = this.state.params;
		params.page = id + 1;
		this.setState({ load: true, params });

		const prod = await getProducts(params);
		this.setState({
			load: false,
			productData: (prod.data && prod.data.data) || prod.data.data || {},
		});
		if (this.state.productData && this.state.productData.data.length) {
			let lists = [...this.state.dataList, ...this.state.productData.data]
			this.setState({ dataList: lists })
			this.receivedData();

		}

	};
	handlePageClick = async (e) => {
		const id = window.location.href.slice(
			window.location.href.lastIndexOf("/") + 1
		);
		const params = {
			subcategory_id: id,
			page: this.state.productData.current_page + 1,
		};

		const prod = await getProducts(params);
		this.setState({
			productData: (prod.data && prod.data.data) || prod.data.data || {},

		});

		if (this.state.productData && this.state.productData.data.length) {
			let lists = [...this.state.dataList, ...this.state.productData.data]
			this.setState({ dataList: lists })
			this.receivedData();
		}
	}
	handlePageClickFilter = async (e) => {
		const id = window.location.href.slice(
			window.location.href.lastIndexOf("/") + 1
		);
		const params = {
			subcategory_id: window.location.href.slice(
				window.location.href.lastIndexOf("/") + 1
			),
			vertical_id: this.state.verticleCategories,
			sortOrder: this.state.sortOrderValue,
			sortBy: String(this.state.sort),
			page: this.state.productData.current_page + 1,

		};

		const prod = await getProducts(params);
		this.setState({
			productData: (prod.data && prod.data.data) || prod.data.data || {},

		});

		if (this.state.productData && this.state.productData.data.length) {
			let lists = [...this.state.dataList, ...this.state.productData.data]
			this.setState({ dataList: lists })
			this.receivedData();
		}
	}
	onFilterChangeHandle = async (e) => {
		const name = e.target.name;
		this.setState({
			...this.state,
			[name]: e.target.value,
		});

		if (e.target.name === "subCategories") {
			const tempVerticalData = await getVerticalCategory(e.target.value);
			this.setState({ verticalCategoryList: tempVerticalData.data.data });
		}

		if (e.target.name === "state") {
			const tempDistrictData = await getDistrict(e.target.value);
			this.setState({ stateValue: e.target.value })
			this.setState({ districtList: tempDistrictData });
		}
	};
	onFilterChangeHandleClick = async (e) => {
		// this.setState({
		// 	...this.state,
		// 	[name]: e.target.value,
		// });
		const id = window.location.href.slice(
			window.location.href.lastIndexOf("/") + 1
		);

		const tempVerticalData = await getVerticalCategory([id]);
		this.setState({ verticalCategoryList: tempVerticalData.data.data });
	};

	onFilterReset = async () => {
		this.setState({
			data: [],
			productData: [],
			verticleCategories: null,
			state: null,
			district: null,
			price: null,
			verticalCategoryList: [],
			districtList: [],
			drawer: false,
			sort: [],
			sortValue: [],
			sortOrder: [],
			sortOrderValue: [],
			params: { page: 1 },
			districtValue: [],
			dataList: '',
			type: 'verticalCategory',
		});
		const id = window.location.href.slice(
			window.location.href.lastIndexOf("/") + 1
		);
		const params = {
			subcategory_id: id,
			page: 1,
		};
		this.setState({ params, load: true });
		const prod = await getProducts(params);
		this.setState({
			load: false,
			productData: prod.data && prod.data.data ? prod.data.data : {},
		});
	};

	handleOpen = () => {
		this.setState({ open: true })
	};
	onFilterSubmit = async () => {
		this.setState({ drawer: false, load: true, productData: [] });
		const params = {
			subcategory_id: window.location.href.slice(
				window.location.href.lastIndexOf("/") + 1
			),
			vertical_id: this.state.verticleCategories,
			sortOrder: this.state.sortOrderValue,
			sortBy: String(this.state.sort),
			page: 1,
		};
		this.setState({
			params, load: true
		});
		const prod = await getProducts(params);
		this.setState({
			load: false,
			productData: prod.data && prod.data.data ? prod.data.data : {},
		});
		this.setState({ params });

		if (this.state.productData && this.state.productData.data) {
			if (this.state.productData.data.length <= 0) { this.setState({ openProductList: true }) }
		}
		if (this.state.productData && this.state.productData.data && this.state.productData.data.length) {
			this.setState({ dataList: [], openProductScroll: true })
			let lists = [...this.state.dataList, ...this.state.productData.data]
			this.setState({ dataList: lists })
		}
		this.receivedData();
		this.setState({ drawer: false })

	};

	onDrawerClick = (p) => {
		this.setState({ drawer: p });
		this.onFilterChangeHandleClick()

	};
	onClickGenerateShareLink = () => {
		let tempUrl = "https://" + window.location.hostname + "/all-product/" + 'subCategoryId=' + window.location.href.slice(
			window.location.href.lastIndexOf("/") + 1
		); if (this.state.verticleCategories !== null) {
			tempUrl = `${tempUrl}&vertical=${this.state.verticleCategories}&`;
		}
		if (this.state.sort !== null) {
			tempUrl = `${tempUrl}sortBy=${this.state.sort}&`;
		}
		if (this.state.sortOrderValue !== null) {
			tempUrl = `${tempUrl}&sortOrder=${this.state.sortOrderValue}&`;
		}


		return tempUrl;
	};


	handleScroll = (e) => {
		let botton = e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 50;
		if (botton) {
			this.handlePageClick()
		}

	}
	render() {
		if (
			(!checkLogin() && !checkSkip()) ||
			(!checkLogin() && !checkBadatExpiration())
		) {
			//loginPopUp(this.props.history);
		}
		console.log(window.location.href?.split("cat=")[1]?.split("%20")?.join(" "), "id cat");
		return (
			<LoadingOverlay active={this.state.load} spinner text="Loading...">
				<Helmet>
					<title>
						{this.state.productData && this.state.productData.length > 0
							? this.state.productData[0].subcategory.name
							: "Badhat"}
					</title>
					<meta name="keywords" content="badhat,badat,badhat.app" />
					<meta
						name="description"
						content="Badhat is a personal app/website for B2B businesses.Retailers easily connect, browse, & ORDER products from wholesalers/Suppliers.Badhat provides seamless connectivity between Suppliers (Manufacturers, Stockists, Dealers, Distributors,Agent, Brands, suppliers) and Buyers (Retailers,kirnana shops, Re-sellers, online sellers etc.)."
					/>
					<link
						rel="stylesheet"
						href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
						integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
						crossorigin="anonymous"
					/>
					<link
						rel="apple-touch-icon"
						href={
							this.state.productData && this.state.productData.length > 0
								? this.state.productData[0].category.bg_image
								: "%https://drive.google.com/file/d/1hZFX14ynp6EuS-Sdtkt0fqbA6FsHl7NU/view"
						}
					/>
				</Helmet>
				<Fab
					variant="extended"
					size="small"
					// color="red"
					aria-label="add"
					style={{
						zIndex: "5",
						margin: 0,
						top: 300,
						right: -8,
						left: "auto",
						position: "fixed",
						height: 25,
						fontSize: "small",
						textAlign: "left",
						paddingLeft: 4,
						backgroundColor: "rgb(255, 171, 36)",
						textTransform: "capitalize",
					}}
					onClick={() =>
						window.open(
							"https://play.google.com/store/apps/details?id=com.badhat.app"
						)
					}
				>
					Open App
				</Fab>



				<div className="verticleCategoryContainer">
					<div className="categoryCardContainer_VerticleCategory">
						{/* <SliderCategory
							onClickCategoryHandle={this.onClickCategoryHandle}
						/> */}
						<SliderCategoryNew
							onClickCategoryHandle={this.onClickCategoryHandle}
						/>
					</div>

					{this.state.subcategoryList && this.state.subcategoryList.length > 0 ? (
						<div className="selectedSubCategory">
							<div
								className={
									this.state.subcategoryList && this.state.subcategoryList.length > 5
										? "subCategoryGridContainer h-fix"
										: "subCategoryGridContainer_Less_item h-fix"
								}
								style={{height: "77px"}}
							>
								{this.state.subcategoryList && this.state.subcategoryList.length > 0
									? this.state.subcategoryList.map((res) => (
										<div
											className="subCategorySliderCard"
											key={res.id}
											onClick={() => this.onClickSubCatHandle(res.id, res.category_id)}
										>
											<Paper
												className="subCategoryPaperNew"
												style={{ backgroundColor: "#fff", cursor: "pointer", borderRadius: "6px" }}
												variant="outlined"
											>
												{/* <img src={"https://firebasestorage.googleapis.com/v0/b/badhat-storage.appspot.com/o/CateoryImages%2Fbags_banner.jpg?alt=media&token=b9c8b353-5cef-404d-aa6b-ad070a9897ea"} alt="" style={{ height: "50px", width: "50px", float: "left", marginTop: "10px", marginLeft: "4px", borderRadius: "8px" }} /> */}
												<div className="sliderCardSubCategoryName wrap">
													{res.name}
												</div>
											</Paper>
										</div>
									))
									: "no data found"}
							</div>
						</div>
					) : null}

					<div className="selectedVerticleCategory">
						<div>
							{this.state.productData &&
								this.state.productData.length > 0 &&
								this.state.productData[0].category &&
								this.state.productData[0].category.name ? (
								<span>{`${this.state.productData[0].category.name}`}</span>
							) : null}
							{this.state.productData &&
								this.state.productData.length > 0 &&
								this.state.productData[0].subcategory &&
								this.state.productData[0].subcategory.name ? (
								<span>{`>${this.state.productData[0].subcategory.name}`}</span>
							) : null}
						</div>
						{this.state.data && this.state.data.length > 0 ? (
							<div
								className={
									this.state.data && this.state.data.length < 5
										? "verticleCategoryGridContainer_Less_item h-fix"
										: "verticleCategoryGridContainer h-fix"
								}
							>
								{this.state.data && this.state.data.length > 0
									? this.state.data.map((res) => (
										<div
											className="verticleCategorySliderCard"
											key={res.id}
											onClick={() => this.onClickHandle(res.id, this.props.history.location.search)}
										>
											<div className="verticleCategoryPaperNew" style={{ backgroundColor: "#fff", cursor: "pointer" }}>
												<div className="sliderCardVerticleCategoryName">
													{res.name}
												</div>
											</div>
											{/* <Paper className="verticleCategoryPaperNew" style={{ backgroundColor: "#fff", cursor: "pointer" }} elevation={5}>
											<img src={"https://firebasestorage.googleapis.com/v0/b/badhat-storage.appspot.com/o/CateoryImages%2Fbags_banner.jpg?alt=media&token=b9c8b353-5cef-404d-aa6b-ad070a9897ea"} alt="" style={{height:"50px", width: "50px", float:"left", marginTop:"10px", marginLeft:"4px", borderRadius: "8px"}} />
												<div className="sliderCardVerticleCategoryName">
													{res.name}
												</div>
											</Paper> */}
										</div>
									))
									: null}
							</div>
						) : null}
					</div>
					<Banners
						endPoint={ENDPOINT_GET_SUB_CATEGORIES_BANNER}
						id={window.location.href.slice(
							window.location.href.lastIndexOf("/") + 1
						)}
					/>
					{this.state.load ? (
						""
					) : (
						<div className="productContainer">
							<div className="productContainerHeading" >Products</div>
							{
								<div style={{ marginBottom: "5px", marginTop: "5px" }}>
									{this.state.openProductScroll && <Button
										onClick={this.handleOpen}
										y style={{ float: "right", color: "orange", fontWeight: "700" }}
									>
										<ShareIcon />
									</Button>}
									<Button
										onClick={() => this.onDrawerClick(true)}
										style={{ float: "right", color: "orange", fontWeight: "700" }}
									>
										<FilterListIcon />
										Sort & Filters
									</Button>
								</div>

							}
							<>
								<Drawer
									anchor="bottom"
									open={this.state.open}
									onClose={this.handleClose}
								>
									<div
										style={{
											width: "100%",
											height: "150px",
											display: "flex",
											flexDirection: "row",
											flexWrap: "wrap",
											padding: "5px",
										}}
									>
										<div className="ProductDetailShareButton">
											<WhatsappShareButton url={this.onClickGenerateShareLink()}>
												<WhatsappIcon />
											</WhatsappShareButton>
										</div>
										<div className="ProductDetailShareButton">
											<FacebookShareButton url={this.onClickGenerateShareLink()}>
												<FacebookIcon />
											</FacebookShareButton>
										</div>
										<div className="ProductDetailShareButton">
											<TelegramShareButton url={this.onClickGenerateShareLink()}>
												<TelegramIcon />
											</TelegramShareButton>
										</div>
										<div className="ProductDetailShareButton">
											<TwitterShareButton url={this.onClickGenerateShareLink()}>
												<TwitterIcon />
											</TwitterShareButton>
										</div>
										<div className="ProductDetailShareButton">
											<PinterestShareButton url={this.onClickGenerateShareLink()}>
												<PinterestIcon />
											</PinterestShareButton>
										</div>
										<div className="ProductDetailShareButton">
											<LinkedinShareButton url={this.onClickGenerateShareLink()}>
												<LinkedinIcon />
											</LinkedinShareButton>
										</div>
										<div className="ProductDetailShareButton">
											<EmailShareButton url={this.onClickGenerateShareLink()}>
												<EmailIcon />
											</EmailShareButton>
										</div>
										<div className="ProductDetailShareButton">
											<InstapaperShareButton
												url={this.onClickGenerateShareLink()}
											>
												<InstapaperIcon />
											</InstapaperShareButton>
										</div>
									</div>
								</Drawer>
							</>
							<div>
								<Drawer
									anchor="bottom"
									open={this.state.drawer}
									onClose={() => this.state.onDrawerClick(false)}
								>
									<div className="productFliters">


										{
											<div className="filters">
												<FormControl fullWidth>
													<InputLabel>Vertical Categories</InputLabel>

													<Select
														name="verticleCategories"
														value={this.state.verticleCategories}
														onChange={(e) => this.onFilterChangeHandle(e)}
													>

														{this.state.verticalCategoryList &&
															this.state.verticalCategoryList.map((res) => {
																return (
																	<MenuItem key={res.id} value={res.id}>
																		{res.name}
																	</MenuItem>
																);
															})
														}
													</Select>
												</FormControl>
											</div>
										}
										<div className="filters">
											<FormControl fullWidth>
												<InputLabel shrink={true}>Sort</InputLabel>
												<Select
													name="sort"
													value={this.state.sort}
													onChange={(e) => this.onFilterChangeHandle(e)}
													labelId="demo-multiple-name-label"
													id="demo-multiple-name"
													multiple
													MenuProps={MenuProps}
												>
													<MenuItem value="created_at">Latest Item</MenuItem>
													<MenuItem value="price">By Price</MenuItem>
													<MenuItem value="popularity">By Popularity</MenuItem>
												</Select>
											</FormControl>
										</div>
										<div className="filters">
											<FormControl fullWidth>
												<InputLabel>Sort Order</InputLabel>
												<Select
													name="sortOrderValue"
													value={this.state.sortOrderValue}
													onChange={(e) => this.onFilterChangeHandle(e)}

												>
													<MenuItem value="ASC">Ascending</MenuItem>
													<MenuItem value="DESC">Descending</MenuItem>
												</Select>
											</FormControl>
										</div>
										<div className="filters">
											<FormControl fullWidth>
												<InputLabel>State</InputLabel>
												<Select
													name="state"
													value={this.state.stateValue}
													onChange={(e) => this.onFilterChangeHandle(e)}

												>
													{this.state.stateData && this.state.stateData.length > 0
														? this.state.stateData.map((res) => {
															return (
																<MenuItem key={res} value={res}>
																	{res}
																</MenuItem>
															);
														})
														: null}
												</Select>
											</FormControl>
										</div>
										{this.state.stateValue ? (
											<div className="filters">
												<FormControl fullWidth>
													<InputLabel>District</InputLabel>
													<Select
														name="districtValue"
														value={this.state.districtValue}
														onChange={(e) => this.onFilterChangeHandle(e)}
													>
														{this.state.districtList &&
															this.state.districtList.length > 0
															? this.state.districtList.map((res) => {
																return (
																	<MenuItem key={res} value={res}>
																		{res}
																	</MenuItem>
																);
															})
															: null}
													</Select>
												</FormControl>
											</div>
										) : null}
										<div className="filterButtonContainer">
											<div className="filterButton">
												<Button
													fullWidth
													variant="outlined"
													color="primary"
													onClick={this.onFilterReset}
												>
													Reset Filters
												</Button>
											</div>
											<div className="filterButton">
												<Button
													fullWidth
													variant="outlined"
													color="primary"
													onClick={this.onFilterSubmit}
												>
													Apply Filters
												</Button>
											</div>
										</div>
									</div>
								</Drawer>
							</div>

							{this.state.productData && this.state.productData.data && !this.state.openProductList ? (


								<div className="productListing" >
									{this.state &&
										this.state.productData &&
										this.state.productData
										? this.state.prodData
										: "no data found"}

									{this.state &&
										this.state.productData &&
										this.state.productData.data && this.state.productData.data.length
										? <InfiniteScroll
											dataLength={this.state.dataList.length}
											hasMore={true || false}
											pageStart={0}
											next={this.state.openProductScroll ? this.handlePageClickFilter : this.handlePageClick}
											style={{ height: 400 }}

											useWindow={false}
											endMessage={
												<p style={{ textAlign: "center" }}>
													<b>Yay! You have seen it all</b>
												</p>
											}

											loader={this.state.dataList.length ? <h4>No More data to load</h4> : <NoDataFound content="No Product Found" />}
										/> : <h4>No More data to load</h4>}

								</div>

							) : (
								<NoDataFound content="No Product Found" />
							)}
						</div>
					)}
				</div>
				<Footer />
			</LoadingOverlay>
		);
	}
}

export default withRouter(VerticleCategory);
