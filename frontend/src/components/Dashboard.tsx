import { IoArrowBack } from "react-icons/io5";
import logo from "../assets/logo.png";
import { IoHomeOutline } from "react-icons/io5";
import { RxGear } from "react-icons/rx";
import { IoIosNotificationsOutline } from "react-icons/io";

const Dashboard = () => {
  return (
    <section className="flex text-white ">
      <nav className="border px-4  h-screen">
        <div className="mb-8 mt-12 border ">
          <img src={logo} alt="" />
        </div>
        <div className="flex flex-col">
          <button className="flex mb-2 items-center">
            <IoHomeOutline size={22} className="mr-2" />
            <span>Overview</span>
          </button>
          <div className="grid row-auto gap-y-2">
            <button className="hover:hover:bg-gray-600 w-full rounded-md p-2 text-left cursor-pointer">
              Orders
            </button>
            <button className="hover:hover:bg-gray-600 w-full rounded-md p-2 text-left cursor-pointer">
              Meals
            </button>
            <button className="hover:hover:bg-gray-600 w-full rounded-md p-2 text-left cursor-pointer">
              Customers
            </button>
          </div>

          <div className="flex flex-col items center mt-8 border-t-1 pt-8 text-md">
            <button className="flex items-center cursor-pointer hover:hover:bg-gray-600 p-2 rounded-md">
              <RxGear size={22} className="mr-2" />
              Settings
            </button>
            <button className="flex items-center  hover:hover:bg-gray-600 p-2 rounded-md cursor-pointer">
              <IoIosNotificationsOutline size={22} className="mr-2" />
              Notifications
            </button>
          </div>
        </div>
      </nav>

      <div>
        <div className="">
          <button>
            <IoArrowBack />
          </button>
          <div>
            <span>Back to list</span>
            <span>Add New Product</span>
          </div>
        </div>

        {/* main section */}
        <div>
          <form className="flex">
            {/* Image upload */}
            <div>
              <h2>Product Image</h2>
              <div>
                <img src="" alt="" />
              </div>
              <input type="file" />
            </div>

            {/* General Information */}
            <div>
              <h2>General Information</h2>
              <legend>
                <div>
                  <h2>Product Name</h2>
                  <input type="text" placeholder="Enter product name" />
                </div>
                <div>
                  <div>
                    <h2>Category</h2>
                    dropdown list
                  </div>
                  <div>
                    <h2>Product Merk</h2>
                    <input type="text" />
                  </div>
                </div>
                {/* Price */}
                <div>
                  <div>
                    <h2>Price</h2>
                    <input type="number" name="" id="" />
                  </div>
                  <div>
                    <h2>Discount</h2>
                    <input type="text" />
                  </div>
                  <div>
                    <h2>Discount Price</h2>
                    <span>R100.00</span>
                  </div>
                </div>
                {/* Description */}
                <div>
                  <h2>Business Descriptions</h2>
                  <textarea name="" id="" placeholder="Description"></textarea>
                </div>
              </legend>
              <button type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
