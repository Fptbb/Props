#By Fptbb
#Configura VSCode, Git e Nodejs (Latest) na maquina e seta os Paths

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

#https://github.com/git-for-windows/git/releases
$PortableGit = "https://github.com/git-for-windows/git/releases/download/v2.28.0.windows.1/PortableGit-2.28.0-64-bit.7z.exe"
#https://nodejs.org/en/download/current/
$NodeFile = "https://nodejs.org/dist/v14.7.0/node-v14.7.0-win-x64.zip"

Set-ExecutionPolicy Bypass -Scope Process -Force;
download -RemoteFile "https://go.microsoft.com/fwlink/?Linkid=850641" -DownloadFile $env:Temp"\vscode.zip" -DoExtractFile $true -AddedPath $env:LOCALAPPDATA"\VsCode"
download -RemoteFile $NodeFile -DownloadFile $env:Temp'\node.zip' -DoExtractFile $true -AddedPath $env:LOCALAPPDATA"\Node"
Move-Item -Path $env:LOCALAPPDATA"\Node\node" -Destination $env:LOCALAPPDATA"\Node1"
Remove-item -Path $env:LOCALAPPDATA"\Node"
Rename-item -Path $env:LOCALAPPDATA"\Node1" -NewName $env:LOCALAPPDATA"\Node"
npm install yarn -g
download -RemoteFile $PortableGit -DownloadFile $env:TEMP'\PortableGit.exe' -DoExtractFile $false -AddedPath $env:LOCALAPPDATA'\Git' -Debug
& $env:TEMP'\PortableGit.exe' -o $env:LOCALAPPDATA'\Git' -y
