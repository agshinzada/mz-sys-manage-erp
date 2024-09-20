import { Card } from "antd";

const ProjectCard = ({ image, title, imageSize, link }) => {
  return (
    <Card>
      <a href={link} className="flex items-center gap-2 cursor-pointer">
        <img src={image} alt="client" className={imageSize} />
        <p>{title}</p>
      </a>
    </Card>
  );
};

export default ProjectCard;
