import { useEffect } from "react";
import { getUserProfileData } from "../../Api/api";
import Navbar from "../../Components/Navbar/Navbar";
import { useAuth } from "../../Context/AuthContext";
import "./ProfilePage.css";

type Props = {};

function capitalizeFirstLetter(name: string | null | undefined): string {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

function formatDateString(dateString: string | null | undefined): string {
  if (!dateString) return "";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default function ProfilePage({}: Props) {
  const { user, setUser } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getUserProfileData();
      if (profileData) {
        setUser(profileData);
      }
    };
    fetchProfile();
  }, [setUser]);

  return (
    <div>
      <Navbar />
      <div className="profile-main-content">
        <div className="profile-container">
          <div className="profile-header">
            <img
              src="https://nserc-hi-am.ca/2023/wp-content/uploads/sites/21/2022/04/285-2855863_a-festival-celebrating-tractors-round-profile-picture-placeholder.png"
              alt="Profile Picture"
              className="profile-pic"
            />
            <div className="profile-info">
              <h2>
                {capitalizeFirstLetter(user?.firstName)}{" "}
                {capitalizeFirstLetter(user?.lastName)}
              </h2>
              <p>@{user?.username}</p>
            </div>
            <button className="edit-button">Edit</button>
          </div>
          <div className="profile-details">
            <div className="detail-item">
              <strong>About:</strong>{" "}
              <span>
                I've worked in the asset management industry for 14 years for
                companies including Blackrock, State Street, and Vanguard. I
                enjoy fishing, hiking, and spending time outside with my wife
                and eighteen kids.
              </span>
            </div>
            <hr />
            <div className="detail-item">
              <strong>Display Name:</strong>{" "}
              <span>{capitalizeFirstLetter(user?.display_name)}</span>
            </div>
            <hr />
            <div className="detail-item">
              <strong>Username:</strong> <span>@{user?.username}</span>
            </div>
            <hr />
            <div className="detail-item">
              <strong>Email:</strong> <span>{user?.email}</span>
            </div>
            <hr />
            <div className="detail-item">
              <strong>Address:</strong> <span>{user?.address}</span>
              <span>
                {user?.apt}, {user?.city}, {user?.state} {user?.zip}
              </span>
              <span>{user?.country_of_tax_residence}</span>
            </div>
            <hr />
            <div className="detail-item">
              <strong>Date of Birth:</strong>{" "}
              <span>{formatDateString(user?.dob)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
