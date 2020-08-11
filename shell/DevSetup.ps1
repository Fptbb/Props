#By Fptbb
#Configura VSCode, Git e Nodejs (Latest) na maquina e seta os Paths
$arch = "64" #64x ou 86x

function download {
    param (
	  $RemoteFile,
	  $DownloadFile,
	  [bool]$DoExtractFile = $False,
	  [string]$ExecutePath = $null,
	  $AddedPath
    )

    Write-Host $RemoteFile
	Write-Host $DownloadFile

	Invoke-WebRequest -Uri $RemoteFile -OutFile $DownloadFile
	If ($DoExtractFile){
	  Expand-Archive $DownloadFile -DestinationPath $AddedPath -Force
	}
	If (-Not ([string]::IsNullOrEmpty($ExecutePath))){
	  & "$ExecutePath"
	}  
	$env:Path += ";"+$AddedPath
	[Environment]::SetEnvironmentVariable("Path", $env:Path, [System.EnvironmentVariableTarget]::User);
}

#Set download links that is stable (Update)

#Vai baixar a ultima versão do git
$PortableGit = "https://fptbb.com/program/latest/PortableGit?arch=$arch"
#Vai baixar a ultima versão do node latest, adicione &version=lts caso queira a Long Term Support
$NodeFile = "https://fptbb.com/program/latest/Node?arch=$arch"

Set-ExecutionPolicy Bypass -Scope Process -Force;
download -RemoteFile "https://go.microsoft.com/fwlink/?Linkid=850641" -DownloadFile $env:Temp"\vscode.zip" -DoExtractFile $true -AddedPath $env:LOCALAPPDATA"\VsCode"
download -RemoteFile $NodeFile -DownloadFile $env:Temp'\node.zip' -DoExtractFile $true -AddedPath $env:LOCALAPPDATA"\Node"
Move-Item -Path $env:LOCALAPPDATA"\Node\node" -Destination $env:LOCALAPPDATA"\Node1"
Remove-item -Path $env:LOCALAPPDATA"\Node"
Rename-item -Path $env:LOCALAPPDATA"\Node1" -NewName $env:LOCALAPPDATA"\Node"
npm install yarn -g
download -RemoteFile $PortableGit -DownloadFile $env:TEMP'\PortableGit.exe' -DoExtractFile $false -AddedPath $env:LOCALAPPDATA'\Git' -Debug
& $env:TEMP'\PortableGit.exe' -o $env:LOCALAPPDATA'\Git' -y
