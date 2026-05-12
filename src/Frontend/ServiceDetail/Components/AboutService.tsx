type AboutServiceProps = {
    about: string | any;
}

function AboutService( { about }: AboutServiceProps) {
    return (<div className="flex flex-col bg-[#F3EEFF] p-6 gap-6 rounded-2xl">
        <h3 className="text-2xl text-[#2C2A51]">About This Service</h3>
        <p>{about}</p>

    </div>)
}

export default AboutService;