type AboutServiceProps = {
    about: string | null;
}

function AboutService( { about }: AboutServiceProps) {
    return (<div className="flex flex-col bg-[#F3EEFF] p-6 gap-6 rounded-2xl">
        <h3 className="text-2xl text-[#2C2A51]">About This Service</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus voluptatum facilis velit doloremque nihil totam eum deserunt magnam quisquam! Voluptate odio id praesentium fugiat consectetur unde molestias harum? Eos perspiciatis dolorum blanditiis voluptates animi nihil sed? Eaque, molestiae ipsa nulla, officia dolorum, dolorem facilis expedita sequi modi tempore odio distinctio?</p>

    </div>)
}

export default AboutService;