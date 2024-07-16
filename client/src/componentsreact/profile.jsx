 export default function Profile(){ 
<Card className="w-[30vw] mr-[2%] mt-[2%] ">
      <CardHeader>
        <CardTitle>Create Poll</CardTitle>
        <CardDescription>Create your new Poll in one-touch.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your poll" onChange={(e)=>setinputPollname(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Description</Label>
              <Input id="name" placeholder="Description of your poll" onChange={(e)=>setinputPolldescription(e.target.value)}/>
            </div>
            
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={()=>{
            if(isLoggedin){
                setpollname(inputPollname);
                setpolldescription(inputPolldescription);
                navigate('/create');}
            else{
                
            }
        }}>Create</Button>
      </CardFooter>
    </Card>
 }