import React, { useState } from 'react';
import '../App.css'; // Assuming this is your CSS file
import Logo from './images/Screenshot 2024-02-23 080758.png'; // Path to your logo image
import Slider from 'rc-slider'; // Range slider component
import 'rc-slider/assets/index.css'; // Styles for the range slider
import { IoMdArrowRoundForward } from "react-icons/io"; // Icon component for arrow
import { GoDownload } from "react-icons/go"; // Icon component for download
import { FaAngleDown } from "react-icons/fa6"; // Icon component for angle down
import { FaRupeeSign } from "react-icons/fa"; // Icon component for rupee sign
import Featured from './images/Screenshot_2024-02-22_171757-removebg-preview.png'; // Path to your featured image
import { MdOutlineCompareArrows } from "react-icons/md"; // Icon component for compare arrows
import { FaCircle } from "react-icons/fa"; // Icon component for circle
import { FaCheck } from "react-icons/fa6"; // Icon component for checkmark


const CollegeTable = ({ data }) => {
    // State variables
    const [searchTerm, setSearchTerm] = useState('');
    const [visibleData, setVisibleData] = useState(data.slice(0, 10));
    const [priceRange, setPriceRange] = useState([0, 300000]);
    const [ratings, setRatings] = useState([0, 10]);
    const [cdrating, setCdrating] = useState([0, data.length]);
    const [sortBy, setSortBy] = useState("ascending"); // Initialize sortBy state

    // Handlers for filtering and sorting
    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        const filteredData = data.filter(college =>
            college.name.toLowerCase().includes(searchTerm)
        );
        setVisibleData(filteredData);
    };

    const handleSortByPrice = (value) => {
        setPriceRange(value);
        const filteredData = data.filter(college =>
            college.courseFees >= value[0] && college.courseFees <= value[1]
        );
        setVisibleData(filteredData);
    };

    const handleSortByUserReview = (value) => {
        setRatings(value);
        const filteredData = data.filter(college =>
            college.userReviews >= value[0] && college.userReviews <= value[1]
        );
        setVisibleData(filteredData);
    };

    const handleSortByCdReview = (value) => {
        setCdrating(value);
        const filteredData = data.filter(college =>
            college.cdRank >= value[0] && college.cdRank <= value[1]
        );
        setVisibleData(filteredData);
    };

    const handleSortByOrder = () => {
        if (sortBy === 'ascending') {
            const sortedData = visibleData
                ? [...visibleData].sort((a, b) => visibleData.indexOf(b) - visibleData.indexOf(a))
                : [...data].sort((a, b) => data.indexOf(b) - data.indexOf(a));
            setVisibleData(sortedData);
            setSortBy('descending');
        } else if (sortBy === 'descending') {
            const sortedData = visibleData
                ? [...visibleData].sort((a, b) => visibleData.indexOf(b) - visibleData.indexOf(a))
                : [...data].sort((a, b) => data.indexOf(b) - data.indexOf(a));
            setVisibleData(sortedData);
            setSortBy('ascending');
        }
    };

    const loadMore = () => {
        const newData = data.slice(0, visibleData.length + 10);
        setVisibleData(newData);
    };

    return (
        <>
            {/* Navbar */}
            <nav className="flex items-center justify-between bg-gray-800 p-2">
                <div className="text-white font-bold flex items-center">
                    <img alt="Logo" src={Logo} className="h-10 rounded-lg" />
                </div>
                <div className="flex justify-center items-center w-full">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search by college name"
                        className="block mx-auto border border-gray-300 rounded-md px-4 w-96 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </nav>

            {/* Filters */}
            <div className="flex p-2">
                <div className='w-[18%] h-screen px-1'>
                <h1 className='text-center font-semibold bg-emerald-500 p-2'>Filters</h1>
                
                    {/* Sort by Fees */}
                    <div className="w-[90%] mx-auto my-4">
                        <div className='bg-gray-800 px-4 py-2 space-y-2 rounded-xl'>
                            <h2 className="font-semibold text-center text-white">Sort by Fees</h2>
                            <div className='flex justify-between'>
                                <h1 className='text-white'>{priceRange[0]}</h1>
                                <h1 className='text-white'>{priceRange[1]}</h1>
                            </div>
                            <Slider range value={priceRange} onChange={handleSortByPrice} min={0} max={300000} />
                        </div>
                    </div>

                    {/* Sort by User review rating */}
                    <div className="w-[90%] mx-auto my-4">
                        <div className='bg-gray-800 px-4 py-2 space-y-2 rounded-xl'>
                            <h2 className="font-semibold text-center text-white">Sort by User review rating</h2>
                            <div className='flex justify-between'>
                                <h1 className='text-white'>{ratings[0]}</h1>
                                <h1 className='text-white'>{ratings[1]}</h1>
                            </div>
                            <Slider range value={ratings} onChange={handleSortByUserReview} max={10} min={0} step={0.1} />
                        </div>
                    </div>

                    {/* Sort by Collegedunia Ratings */}
                    <div className="w-[90%] mx-auto my-4">
                        <div className='bg-gray-800 px-4 py-2 space-y-2 rounded-xl'>
                            <h2 className="font-semibold text-center text-white">Sort by Collegedunia Ratings</h2>
                            <div className='flex justify-between'>
                                <h1 className='text-white'>{cdrating[0]}</h1>
                                <h1 className='text-white'>{cdrating[1]}</h1>
                            </div>
                            <Slider range value={cdrating} onChange={handleSortByCdReview} max={data.length} min={1} />
                        </div>
                    </div>

                    {/* Sort by Order */}
                    <div className="w-[90%] mx-auto my-4">
                        <div className='bg-gray-800 px-4 py-2 space-y-2 rounded-xl'>
                            <h2 className="font-semibold text-center text-white">Sort by Order</h2>
                            <div className='flex items-center justify-center gap-2 text-white border border-slate-200 p-1 cursor-pointer rounded-2xl' onClick={handleSortByOrder}>
                                <h1 className='text-sm'>{sortBy === 'ascending' ? "Descending" : "Ascending"}</h1>
                                {sortBy === 'ascending' ? <span>&uarr;</span> : <span>&darr;</span>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* College Table */}
                <div className='w-[82%] max-h-screen overflow-auto scrollbar-hidden'>
                    <table className="min-w-full max-h-screen border-collapse">
                        {/* Table Headers */}
                        <thead>
                            <tr>
                                <th className="bg-gray-200 border w-[9%] bg px-4 py-2 cursor-pointer">
                                    CD Rank
                                </th>
                                <th className="bg-gray-200 border w-[35%] bg px-4 py-2 cursor-pointer">
                                    Colleges
                                </th>
                                <th className="bg-gray-200 border w-[14%] bg px-4 py-2 cursor-pointer">
                                    Course Fees
                                </th>
                                <th className="bg-gray-200 border w-[14%] bg px-4 py-2 cursor-pointer">
                                    Placement
                                </th>
                                <th className="bg-gray-200 border w-[14%] bg px-4 py-2 cursor-pointer">
                                    User Reviews
                                </th>
                                <th className="bg-gray-200 border w-[14%] bg px-4 py-2 cursor-pointer">
                                    Ranking
                                </th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {visibleData.map((college, index) => (
                                <tr className={(index === 0 ? "bg-white " : "") + (college.isfeatured === "yes" ? "bg-orange-100" : "bg-slate-50")} key={index}>
                                    {/* CD Rank */}
                                    <td className="border border-gray-300 px-4 py-2">#{college.cdRank}</td>

                                    {/* College Details */}
                                    <td className="relative border border-gray-300 pb-9 pt-3 px-2">
                                        <div className='flex p-1'>
                                            {/* College Logo */}
                                            <div className='flex justify-center w-[10%]'>
                                                <img className='w-8 h-8 rounded-full ' src={college.logo} alt='null' />
                                            </div>

                                            {/* College Info */}
                                            <div className='w-[90%] space-y-1'>
                                                <h1 className='font-bold text text-cyan-400'> {college.name}</h1>
                                                <h1 className='text-xs'>{college.location}</h1>
                                                {college.isfeatured === "yes" ? "" :
                                                    <div style={{ borderLeft: '2px solid orange' }} className='relative bg-orange-100 w-fit px-4 py-1 text-xs rounded-tr-lg rounded-br-lg'>
                                                        <h1 className='text-orange-500'> {college.courseType}</h1>
                                                        <h1>{college.cutoff}</h1>
                                                        <FaAngleDown className='absolute right-0 cursor-pointer text-orange-500 top-2' />
                                                    </div>}
                                            </div>
                                        </div>

                                        {/* College Actions */}
                                        <div className='absolute flex justify-between left-0 bottom-2 right-0 py-1 px-4'>
                                            <h1 className='flex items-center text-xs text-orange-500 font-semibold cursor-pointer'><IoMdArrowRoundForward className='mx-1' /> Apply Now</h1>
                                            <h1 className='flex items-center text-xs text-cyan-400 font-semibold cursor-pointer'><GoDownload className='mx-1' /> Download Brouchure</h1>
                                            <h1 className='flex items-center text-xs font-semibold cursor-pointer'> <input className='mx-1' type='checkbox' /> Add To Compare</h1>
                                        </div>

                                        {/* Featured */}
                                        {college.isfeatured === "yes" && <img className='absolute left-8 top-[-5px] h-5' src={Featured} alt='featured' />}
                                    </td>

                                    {/* Course Fees */}
                                    <td className="border border-gray-300 space-y-1 p-2">
                                        <h1 className='flex items-center font-semibold text-emerald-500 text-md'><FaRupeeSign />{college.courseFees}</h1>
                                        <h1 className='flex items-center font-semibold text-xs'>BE/B.Tech</h1>
                                        <h1 className='flex items-center font-semibold text-xs'>1st Year Fees</h1>
                                        <h1 className='flex items-center text-xs font-semibold text-orange-500 cursor-pointer'><MdOutlineCompareArrows className='text-lg mr-1' />Compare Fees</h1>
                                    </td>

                                    {/* Placement */}
                                    <td className="border border-gray-300 space-y-1 px-4">
                                        <h1 className='flex items-center font-semibold text-emerald-500 text-md'><FaRupeeSign />{college.placementAverage}</h1>
                                        <h1 className='flex items-center font-semibold text-xs'>Average Package</h1>
                                        <h1 className='flex items-center font-semibold text-emerald-500 text-md'><FaRupeeSign />{college.placementHighest}</h1>
                                        <h1 className='flex items-center font-semibold text-xs'>Highest Package</h1>
                                        <h1 className='flex items-center text-xs font-semibold text-orange-500 cursor-pointer'><MdOutlineCompareArrows className='text-lg mr-1' />Compare Placement</h1>
                                    </td>

                                    {/* User Reviews */}
                                    <td className="border border-gray-300 px-4 py-2 space-y-1">
                                        <h1 className='flex items-center'><FaCircle className='text-orange-500 text-xs mr-2' />{college.userReviews} / 10</h1>
                                        <h1 className='flex items-center text-xs font-semibold'>Based on {college.userReviewsNo} User Reviews</h1>
                                        <h1 className='flex items-center justify-between px-2 font-semibold text-red-600 cursor-pointer bg-amber-100 text-xs  rounded-lg'> <FaCheck /> Best in Social Life <FaAngleDown className=' cursor-pointer ' /></h1>
                                    </td>

                                    {/* Ranking */}
                                    <td className="border border-gray-300 px-4 py-2 space-y-1">
                                        <h1>#<span>{college.ranking} </span> / <span className='text-orange-500'>{college.rankingFrom}</span> in India </h1>
                                        <div className='flex'> <img className='h-6' src='https://www.vhv.rs/dpng/d/390-3901198_thumb-image-india-today-in-logo-hd-png.png' alt='' /> <h1 className='px-2 font-semibold'>{college.rankingYear}</h1></div>
                                        <div style={{ borderLeft: "2px solid blue" }} className=' bg-blue-50 shadow-md shadow-gray-200 h-7 px-2'>
                                            <div className='relative'>
                                                <img className='rounded-full absolute border-white h-5 w-5 top-1 bottom-1 left-0' alt='' src='https://e7.pngegg.com/pngimages/586/945/png-clipart-tez-tv-television-channel-india-today-television-show-others-television-text.png' />
                                                <img className='rounded-full absolute border-white h-5 w-5 top-1 bottom-1 left-3' alt='' src='https://e7.pngegg.com/pngimages/366/375/png-clipart-delhi-dilli-aaj-tak-india-today-television-india-republic-day-miscellaneous-television-thumbnail.png' />
                                                <img className='rounded-full border-white absolute h-5 w-5 top-1 bottom-1 left-6' alt='' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo8FoGzkCkCS_x4XVJgCC2bjyG2ThC7zwi3g&usqp=CAU' />
                                            </div>
                                            <h1 className=' relative text-xs w-full font-bold text-cyan-400 text-right px-4 py-1' >+ 4 More  <FaAngleDown className='absolute right-0 cursor-pointer top-2' /> </h1>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Load More Button */}
                    {data.length > visibleData.length && (
                        <button
                            onClick={loadMore}
                            className="block mx-auto my-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Load More...
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default CollegeTable;
