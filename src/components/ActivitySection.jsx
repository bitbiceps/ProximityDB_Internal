const ActivitySection = () => {
  const activities = [
    {
      name: "Name of the client",
      lastReviewed: "05/11/24",
      lastVerified: "28/10/24",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      name: "Name of the client",
      lastReviewed: "05/11/24",
      lastVerified: "28/10/24",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">Activity</h3>
      {activities.map((activity, index) => (
        <div
          key={index}
          className="mb-4 border rounded-lg p-4 bg-gray-50 shadow-sm"
        >
          <p className="font-semibold text-gray-800">{activity.name}</p>
          <p className="text-gray-600 text-sm">
            Last Reviewed: {activity.lastReviewed}
          </p>
          <p className="text-gray-600 text-sm">
            Last Verified: {activity.lastVerified}
          </p>
          <p className="text-gray-600 text-sm mt-2">{activity.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ActivitySection;
