import {
  Component,
  Inject,
  OnInit,
  Optional,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

/**
 * Category data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface CategoryNode {
  name: string;
  description?: string;
  icon?: string;
  blog?: string;
  children?: CategoryNode[];
  parent?: string;
}

const TREE_DATA: CategoryNode[] = [
  {
    name: 'Account',
    description:
      'This is a sample description of the card contanining two lines of description',
    icon: 'person',
    blog: `<h2><strong>Create a knowledgebase account</strong></h2><p>Who can use this feature</p><p>Anyone can create a free knowledgebase account. To collaborate with others you will need to create a <a href="https://help.knowledgebase.com/hc/en-us/articles/360040328273-Choose-a-knowledgebase-Plan">team</a>.</p><p>Check out our <a href="https://help.knowledgebase.com/hc/en-us/articles/360039827194-What-platforms-and-devices-does-knowledgebase-support">What platforms and devices does knowledgebase support</a> article for supported browsers and platforms.</p><p>If someone has invited you to a file, project, or team you can create a knowledgebase account to start collaborating.</p><p><strong>Note:</strong> If you are joining a knowledgebase Organization, you can also sign up for knowledgebase using your company email (SAML SSO). <a href="https://help.knowledgebase.com/hc/en-us/articles/360041064554"><strong>Log in to knowledgebase →</strong></a></p><h2><strong>Email address</strong></h2><p>Sign up for knowledgebase using your <strong>email address </strong>and a <strong>unique password</strong>.</p><ol><li>Head to <a href="http://knowledgebase.com/">knowledgebase.com</a> and click <strong>Sign up</strong> in the top right corner.</li><li>Enter your <strong>Email address</strong> in the field provided.</li><li>Enter a unique <strong>Password</strong> in the field underneath.</li><li>Click the <strong>Sign up</strong> button to complete the process. You will be logged into your new knowledgebase account immediately.</li><li>knowledgebase will send you an email to verify your account. Open the email, and click the verification button to complete the process and log into your new knowledgebase account.</li></ol><h2><strong>Google account</strong></h2><p>If you have a Google account, including a Google business account, you can sign up for a knowledgebase account using your Google account details.</p><ol><li>Head to <a href="http://knowledgebase.com/">knowledgebase.com</a> and click <strong>Sign up</strong> in the top right corner. Or, follow this link directly: <a href="https://www.knowledgebase.com/signup">https://www.knowledgebase.com/signup</a></li><li>Select <strong>Continue with Google</strong> at the top of the window.</li><li>If you're already logged in to Google, you'll be prompted to confirm your details.</li><li>Otherwise, enter your <strong>Google email</strong> or <strong>Phone</strong> in the field provided and click <strong>Next</strong>.</li><li>You will then be able to <strong>Enter your password</strong>.</li><li>Click <strong>Next</strong> to complete the process. A knowledgebase account will then be created under your name and email address.</li></ol><p><strong>Note</strong>: When you sign up with your Google account, you can't make changes to your email address or password in knowledgebase. If you want to use knowledgebase with another email, you will need to disconnect Google from your account. <a href="https://help.knowledgebase.com/hc/en-us/articles/360039820114#Google_SSO"><strong>Switch from Google SSO to email and password →</strong></a></p><h3>What next?</h3><p>Once the sign up process is complete, knowledgebase will take you to the file browser. This is where you can access your unlimited <strong>Drafts</strong> folder, any teams you're a member of, and the knowledgebase Community. <a href="https://help.knowledgebase.com/hc/en-us/articles/360041543473"><strong>Explore knowledgebase →</strong></a></p><p>If you'd like to step it up a notch and collaborate with other designers on projects, then you can <a href="https://help.knowledgebase.com/hc/en-us/articles/360039964073">create teams</a> in knowledgebase. <a href="https://help.knowledgebase.com/hc/en-us/articles/360040328273"><strong>Compare teams and plans in knowledgebase →</strong></a></p><ul><li>On the free <a href="https://help.knowledgebase.com/hc/en-us/articles/360040328273-Compare-teams-and-plans#Starter_plan">Starter</a> plan you can collaborate on <strong>3 files</strong> with <strong>3 pages</strong> each.</li><li>Sign up for a paid <a href="https://help.knowledgebase.com/hc/en-us/articles/360040328273-Compare-teams-and-plans#Professional_plan">Professional</a> plan to collaborate across multiple files and projects.</li><li>Sign up for the <a href="https://help.knowledgebase.com/hc/en-us/articles/360040328273-Compare-teams-and-plans#Organization_plan">Organization</a> plan to share resources and work with colleagues&nbsp;across <strong>multiple teams</strong>.</li></ul>`,
    children: [
      {
        name: 'Login',
        blog: `<h2><strong>Log in or add accounts</strong></h2><p>Who can use this feature</p><p>Supported on <a href="https://help.figma.com/article/209-understanding-figmas-plans">any team or plan</a>.</p><p>SAML SSO is onlly supported on the <a href="https://help.figma.com/article/209-understanding-figmas-plans">Organization and Enterprise plans</a>.</p><p>Log in to your Figma accounts to access your teams, files, and projects in the file browser.</p><p>You can be logged in to a maximum of 10 accounts at a time, and quickly switch between them. Visiting&nbsp;<a href="http://figma.com/">figma.com</a> will open the file browser for the last account you viewed.</p><p>New to Figma? You'll need to create an account using the <strong>Sign up</strong> button instead. <a href="https://help.figma.com/hc/en-us/articles/360039811114"><strong>Learn how to create an account →</strong></a></p><h2><strong>Log in to your account</strong></h2><p>There are three different ways to log in to Figma:</p><ul><li>Email address and password</li><li>Google Sign Sign On</li><li>Third-party identity provider (SAML SSO)</li></ul><p>Which option you can use will depend on your original sign up method and your plan. You can use any method to log in to Figma across all applications and devices.</p><figure class="table"><table><tbody><tr><td>&nbsp;</td><td><a href="https://www.figma.com/">Figma.com (browser)</a></td><td><a href="https://help.figma.com/hc/en-us/articles/360039823654">Figma desktop app</a></td><td><a href="https://help.figma.com/hc/en-us/articles/1500007537281">Figma mobile app (iOS)</a></td><td><a href="https://help.figma.com/hc/en-us/articles/1500007537281">Figma mobile app (Android)</a></td></tr><tr><td>Email</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr><tr><td>Google SSO</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr><tr><td><a href="https://help.figma.com/hc/en-us/articles/360040532333">SAML SSO</a> (Organization plan only)</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr></tbody></table></figure><p><strong>Note</strong>: If you're having trouble logging in to the <a href="https://help.figma.com/hc/en-us/articles/1500007537281">Figma mobile app</a> on an Apple device, make sure you have cookies enabled for Safari. Go to&nbsp;<strong>Settings</strong> &gt; <strong>Safari</strong> &gt; <strong>Privacy &amp; Security</strong> and disable <strong>Block all cookies</strong>. If that doesn't work, try logging in from the Safari app then reopening the Figma app.</p><h2><strong>Email address and password</strong></h2><ol><li>Head to&nbsp;<a href="http://figma.com/">figma.com</a>&nbsp;or open the Figma desktop app.</li><li>Select&nbsp;<strong>Log in</strong>&nbsp;from the navigation bar.</li><li>Enter your&nbsp;<strong>Email address</strong>&nbsp;and&nbsp;then your <strong>Password</strong>.</li><li>Click&nbsp;<strong>Sign in</strong>&nbsp;to access your account.</li></ol><h2><strong>Google SSO</strong></h2><p>If you have a Gmail address, or work for a company that uses Google Workspaces, you can log in using Google SSO.</p><ol><li>Head to&nbsp;<a href="http://figma.com/">figma.com</a>&nbsp;or open the Figma desktop app.</li><li>Click&nbsp;<strong>Log in</strong>&nbsp;in the top-right corner.</li><li>Click the&nbsp;<strong>Continue with Google</strong>&nbsp;button.</li><li>If you're already logged in to Google, you'll simply be prompted to confirm your details.</li><li>Otherwise, enter your&nbsp;<strong>Google Email</strong>&nbsp;or&nbsp;<strong>Phone</strong>&nbsp;number and click&nbsp;<strong>Next</strong>.</li><li><strong>Enter your password</strong>&nbsp;and click&nbsp;<strong>Next</strong>&nbsp;to complete the process.</li></ol><p><strong>Note:</strong> If you're logging into the desktop app via Google SSO, Figma will open a browser window to complete the authentication process. Figma will return you to the desktop app once you're logged in.</p><h2><strong>Third-party provider (SAML SSO)</strong></h2><p>SAML SSO allows members to log in to Figma using their company email address. This means you’ll log in to Figma using your company’s identity provider—like Okta, OneLogin, or Azure Active Directory. <a href="https://help.figma.com/hc/en-us/articles/360040532333"><strong>Guide to SAML SSO →</strong></a></p><ol><li>Head to&nbsp;<a href="http://figma.com/">figma.com</a>&nbsp;or open the Figma desktop app.</li><li>Click&nbsp;<strong>Log in</strong>&nbsp;in the top-right corner.</li><li>Click the&nbsp;<strong>Login with with SAML SSO</strong>&nbsp;link.</li><li>Enter your&nbsp;<strong>Email</strong>&nbsp;address and click&nbsp;<strong>Log in</strong>.</li><li>Figma will check your domain to make sure its registered to an organization. If the domain is registered, you'll be able to enter your&nbsp;<strong>Password</strong>.</li><li>Click&nbsp;<strong>Log in</strong> to access your account.</li></ol><p><strong>Note:</strong> If you're logging into the desktop app via SAML SSO, Figma will open a browser window to complete the authentication process. Figma will return you to the desktop app once you're logged in.</p><h2><strong>Login to additional accounts</strong></h2><p>If you have multiple Figma accounts, you can be logged in to more than one account at a time. This lets you switch between accounts without having to log out and in.</p><p>You can be logged into up to 10 accounts at a time.</p><ol><li>Open Figma in the file browser.</li><li>Click your avatar in the navigation bar to open the account menu.</li><li>Select <strong>Switch account</strong> and then<strong> Add account</strong>.</li><li>Figma will open up a new browser tab where you can log in to your other account via <a href="https://help.figma.com/hc/en-us/articles/360041064554-Log-in-or-add-accounts#email"><strong>email ↑</strong></a>, <a href="https://help.figma.com/hc/en-us/articles/360041064554-Log-in-or-add-accounts#google"><strong>Google SSO ↑</strong></a>, or <a href="https://help.figma.com/hc/en-us/articles/360041064554-Log-in-or-add-accounts#SAMLSSO"><strong>SAML SSO ↑</strong></a>.</li><li>Once authenticated, Figma will close the browser tab and return you to the desktop app or your original tab. You can now see and select the account in the workspace switcher. <a href="https://help.figma.com/hc/en-us/articles/1500005165741"><strong>Learn how to switch between workspaces →</strong></a></li></ol>`,

        children: [
          {
            name: 'Reset password',
          },
          {
            name: 'Two-factor authentication',
            blog: `<h2><strong>Enable two-factor authentication (2FA)</strong></h2><p>Who can use this feature</p><p>Use two-factor authentication on any <a href="https://help.figma.com/hc/en-us/articles/360040328273">Figma team or plan</a></p><p>You can't configure two-factor authentication in Figma if you login via Google SSO or SAML SSO</p><p>Enable two-factor authentication (2FA) to add an extra layer of security to your Figma account. When 2FA is enabled, you need to confirm your identity each time you log in to your Figma account.</p><p>You can authenticate your Figma account using any of the following methods:</p><ul><li>SMS</li><li>Google Authenticator</li><li>Duo Mobile</li><li>Authy</li><li>2FA (Windows phone)</li></ul><p>You need to choose your authentication method as part of the setup process. We recommend installing any authentication apps before you start.</p><p>Two-factor authentication must be set up on each Figma account individually. There isn't currently a way to enable or enforce two-factor authentication across a team or organization.</p><p>Note: If you login to Figma via <a href="https://help.figma.com/hc/en-us/articles/360040047614">Google SSO</a> or <a href="https://help.figma.com/hc/en-us/articles/360040532333">SAML SSO</a>, you won't be able to enable two-factor in Figma. You will need to enable two-factor or multi-factor authentication with your identity provider instead.</p><h2><strong>Set up two-factor</strong></h2><p>Enable two-factor authentication in your Figma account settings. To view and update your account settings:</p><ol><li>Open Figma in the file browser.</li><li>Select your avatar in the top-right corner to open the account menu.</li><li>Select the <strong>Account</strong> tab in the <strong>Settings</strong> modal.</li><li>Go to the <strong>Settings</strong> tab.</li><li>You'll find the <strong>Two-factor authentication</strong> section at the top of the page, under your login details.</li></ol><ul><li>A</li></ul><h2><strong>SMS</strong></h2><ol><li>Click <strong>Enable two-factor authentication</strong>.</li><li>Enter your password to confirm your identity and click <strong>Continue</strong>.</li><li>Select <strong>Send me an SMS instead</strong> option.</li><li>Enter your phone number and click <strong>Verify</strong>. Figma will send you an SMS with a seven-digit code.</li><li>Enter the code you received in Figma and click <strong>Verify</strong>.</li><li>Click <strong>Continue to recovery codes</strong> to receive your recovery code(s).</li><li>Figma will display a list of recovery codes on screen. We recommend saving a copy of these somewhere safe. For example: in a password manager or encrypted file storage.</li></ol><ul><li>B</li></ul><h2><strong>Authenticator app</strong></h2><p>You need to choose your authentication method at the beginning of the set up process. We recommend setting your authenticator up on your device(s) before you enable two-factor in Figma:</p><ul><li><a href="https://support.google.com/accounts/answer/1066447">Get verification codes with <strong>Google Authenticator</strong></a> (external link)</li><li><a href="https://guide.duo.com/prompt">Authenticating with the <strong>Duo Prompt</strong></a> (external link)</li><li><a href="https://support.authy.com/hc/en-us/articles/115001945848-Installing-Authy-apps">Downloading and Installing <strong>Authy</strong> Apps</a></li><li><a href="https://www.microsoft.com/en-us/p/microsoft-authenticator/9nblgggzmcj6">Get <strong>Microsoft Authenticator</strong></a> (external link)</li></ul><ol><li>Click the <strong>Enable two-factor authentication </strong>setting.</li><li>Enter your password to confirm your identity and click <strong>Continue</strong>.</li><li>Figma will display some links to download and install your desired authenticator. Once you have your authenticator installed or set up, click <strong>Continue</strong>.</li><li>Figma will display a unique barcode on screen. Use your authenticator app to scan the barcode.</li><li>Your authenticator app will generate a six digit code. Enter the code in the field provided and click <strong>Verify</strong>.</li><li>Click <strong>Continue to recovery codes</strong> to receive your recovery code(s).</li><li>Figma will display a list of recovery codes on screen. We recommend saving a copy of these somewhere safe. For example: in a password manager or in encrypted file storage.</li></ol><h2><strong>Remove two-factor authentication</strong></h2><p>Remove or reconfigure your two-factor authentication settings at any time. Manage two-factor authentication in your Figma account settings:</p><ol><li>Open Figma in the file browser.</li><li>Select your avatar in the top-right corner to open the account menu.</li><li>Select the <strong>Account</strong> tab in the <strong>Settings</strong> modal.</li><li>Go to the <strong>Settings</strong> tab.</li><li>You'll find the <strong>Two-factor authentication</strong> section at the top of the page, under your login details.</li></ol><ul><li>A</li></ul><h2><strong>SMS</strong></h2><ol><li>Next to the <strong>Configured cell phone number</strong> click <strong>Configure</strong>.</li><li>Enter your password to confirm your identity and click <strong>Continue</strong>.</li></ol><ul><li>B</li></ul><h2><strong>Authenticator app</strong></h2><ol><li>Next to <strong>Authenticator apps are enabled</strong> click <strong>Disable</strong>.</li><li>Enter your password to confirm your identity and click <strong>Continue</strong>.</li><li>Click <strong>Ok</strong> to confirm and remove two-factor authentication.</li><li>Click <strong>Use an authenticator app instead</strong>.</li></ol>`,
          },
        ],
      },
      {
        name: 'Profile',
        blog: `<h2><strong>View your profile</strong></h2><p>View your own internal profile from your Figma account.</p><ol><li>Open your Figma account.</li><li>Click your profile picture in the menu bar to open the account menu.</li><li>Select <strong>Internal profile</strong> from the list.</li></ol><p>When viewing your own profile, you can see all the files you’re working on—including files in your drafts. You’ll also see your email address under your name.</p><p>When other people view your internal profile, they can only see the teams, projects, and files they have access to. We explore <a href="https://help.figma.com/hc/en-us/articles/360039957614-View-internal-profiles#resources">what resources people can see</a> below.</p><p><img src="https://help.figma.com/hc/article_attachments/8449928273559/View_your_own_profile.png" alt="View of your own internal profile"></p><h2><strong>View other profiles</strong></h2><p>View a collaborator's internal profile to see which files, projects, and teams they are working on. Click on a collaborator's profile picture to view their profile. This applies to the profile picture in any of the following places:</p><ul><li>From the toolbar when a member is active in a file or prototype. Hover over their profile picture and click <strong>View profile</strong>.</li><li>On a team or file card when viewing your account in the file browser.</li><li>From organization, team, and project pages:<ul><li><strong>Organization admins</strong> list in the right sidebar of a organization page</li><li><strong>Members</strong> list in the right sidebar of a team page</li><li><strong>Recent contributors</strong> list on the right sidebar of a project page</li></ul></li></ul><p><img src="https://help.figma.com/hc/article_attachments/8417870855831/View_profile_entry_points.png" alt="Internal profile entry points"></p><h3>View profile</h3><ol><li>Hover over a collaborator’s profile picture.</li><li>Figma shows their full name and a prompt to view their profile.</li><li>Click <strong>View profile</strong> to access their personal profile.</li></ol><p><img src="https://help.figma.com/hc/article_attachments/8449927108375/Someone_else_viewing_your_profile.png" alt="Internal profile when someone else is viewing it"></p><p><strong>Tip! </strong>You can also view their internal profile via URL. They will need to share this with you, by copying it from the browser address bar.</p><h2><strong>What resources can others see?</strong></h2><p>When you view someone’s internal profile, you can only view files, projects, and teams that you have access to. This can be <a href="https://help.figma.com/hc/en-us/articles/1500007609322s#access">explicit or inherited access</a>.</p><p><strong>Caution</strong>: Your internal profile doesn’t show your email address. However, collaborators can see your email address when searching your name in their Figma account.</p><h3>Files</h3><h4><strong>Any team or organization plan</strong></h4><p>View any files you have access to, including:</p><ul><li>Files in teams or projects of which you’re a member.</li><li>Files you’ve been explicitly invited to. This can include files in a person’s drafts, or files in a team or project you’re not a member of.</li><li>Files with public access (<strong>Anyone with the link</strong> settings). You don’t need to be a member of a team or project to access a public file.</li><li>In an organization, members can also see files with <strong>Anyone in organization can view/edit</strong> settings. Guests can’t see these files unless they were invited to the file.</li></ul><h3>Projects</h3><h4><strong>Organization or Enterprise plans</strong></h4><p>View a list of projects you have access to:</p><ul><li>Projects from teams you’ve joined as a member.</li><li>Projects someone has invited you to.</li><li>Projects from <a href="https://help.figma.com/hc/en-us/articles/360040450193#Teams">open</a> organization teams. Guests can’t see projects from open teams unless they’re a member of that team.</li><li>You won't see any projects from closed teams, unless you're also a member of the team.</li></ul><p>If you have access to a project, you can click on the project name to view it. If the project lives in an open team you’re not a member of, you won’t be able to click on the project name or view its contents.&nbsp;</p><h4><strong>Professional, Education, and Starter plans</strong></h4><p>View <strong>projects</strong> in any teams of which you’re both a member, or projects you’ve been invited to. You won’t see projects you don’t have access to.</p><h3>Teams</h3><h4><strong>Organization or Enterprise plans</strong></h4><p>View the <strong>team name</strong> of any teams they are a member of.</p><ul><li>Teams you’re both a member of</li><li>Any open or closed teams the person is a member of.&nbsp;</li><li>Figma won’t show secret teams, unless you’re a member of those teams.</li></ul><p><strong>Note:</strong> Organization guests can only see teams of which they’re a member. They can’t view open, closed, or secret teams.</p><p>To view a team you have access to, click on the team name. If the team name is greyed out, it means you aren’t a member of that team and can’t access its contents.</p><p>As the profile shows the name of any open teams, you can still search for that team within the organization. From the search results, click <strong>Join</strong> to access the team and view any files and projects.</p><h4><strong>Professional, Education, and Starter plans</strong></h4><p>View <strong>teams</strong> of which you’re both a member. You can’t see any other teams that person is a member of. Click on the team name to view the team and access any files and projects.</p><h3>Example</h3><p>Let's explore the internal profile for a colleague of ours, Emma. We work in the same organization and are on some of the same teams.</p><ul><li>A</li></ul><p>Emma is a member of four <strong>teams</strong>: <i>Growth Marketing</i>, <i>Product</i>, <i>Brand</i>, and <i>RCS</i>. We're also a member of the <i>Brand</i> and <i>Product</i> teams, so we can click these teams to view them. We're not a member of the <i>Growth Marketing</i> or <i>RCS</i> teams, so we can't interact with those teams. These teams are visible as they have open (<i>Growth Marketing</i>) and closed (<i>RCS</i>) organization access.</p><ul><li>B</li></ul><p>We can see a list of six <strong>recent projects</strong> that Emma has contributed to. Three of these projects live in teams we have access to, so we can access those projects from Emma's profile. The other projects live in the <i>Growth Marketing</i> team: an open team we aren't a member of. We can't see any projects related to the <i>RCS</i> team, as its a closed team.</p><ul><li>C</li></ul><p>There are only six files in her list of recent file contributions that we have access to. There's a file in this list from the <strong>Mobile</strong> project. While we don't have access to this project or its team, we can still access this specific file as link sharing is set to <strong>Anyone with the link</strong>. We can't see any files from the <i>Growth Marketing</i> or <i>RCS</i> teams.</p><p><img src="https://help.figma.com/hc/article_attachments/8449821685143/Annotated_internal_profile.png" alt="Annotated internal profile"></p><p>&nbsp;</p><p>&nbsp;</p><p><br>&nbsp;</p>`,
      },
    ],
  },
];
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  @ViewChild('categoryDialog') categoryDialog: TemplateRef<any> | undefined;
  @ViewChild('sugestionDialog') sugestionDialog:TemplateRef<any> | undefined;
  public Editor = ClassicEditor;
  ckConfig = {
    toolbar: {
      items: [ 'bold', 'italic', '|', 'undo', 'redo', '-', 'numberedList', 'bulletedList' ],
      shouldNotGroupWhenFull: true
  }
  }
  public blog = '';
  dialogRef: any;
  fileName: string = 'Choose images to upload icon (svg, jpg, png)';
  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    icon: '',
    blog: '',
  });

  treeControl = new NestedTreeControl<CategoryNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<CategoryNode>();

  // get subCategories(): FormArray {
  //   return this.firstFormGroup.get('subCategories') as FormArray;
  // }

  // getSubCategories() {
  //   // const subCategory = this._formBuilder.group({
  //   //   name: new FormControl(''),
  //   //   blog: new FormControl('')
  //   // });
  //   this.subCategories.push(this._formBuilder.control(''));
  // }

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit(): void {
    this.open();
  }

  open(node?: any) {
    console.log('node:', node);
    if (this.categoryDialog) {
      const config = {
        width: '50%',
        data: node,
      };
      this.dialogRef = this.dialog.open(this.categoryDialog, config);
      return this.dialogRef;
    }
  }

  hasChild = (_: number, node: CategoryNode) =>
    !!node.children && node.children.length > 0;

  iconChoosen($event: any) {
    const file = $event.target.files[0];
    if (['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
      this.fileName = file.name;
      console.log($event);
    }
  }


  openSuggestion(){
    const config = {
      width:'80%',
      height:'80%'
    }
    if(this.sugestionDialog){
      this.dialogRef = this.dialog.open(this.sugestionDialog, config);
      return this.dialogRef;
    }
  }

  editBlog(){
    this.firstFormGroup.patchValue({
      blog:this.dataSource.data[0].blog
    })
    this.openSuggestion();
  }
  saveCategory(node?: CategoryNode) {
    if (node !== undefined) {
      // const parentNode = this.getLevel(this.dataSource.data, node);
      // console.log('Parent node', parentNode);
      console.log('node', node);
      this.dataSource.data = [node];
    }
    // const data: CategoryNode = this.firstFormGroup.value as any;
    // console.log(this.dataSource.data,'treeee')
    // this.dataSource.data = [...this.dataSource.data, data];
    // console.log(this.firstFormGroup.value);
  }

  // getLevel(data: any, node: any):any {
  //   let path = data.find((branch: CategoryNode) => {
  //     return this.treeControl
  //       .getDescendants(branch)
  //       .some((n) => n.name === node?.name);
  //   });
  //   console.log('path',path)
  //   return path ? this.getLevel(path.children, node) + 1 : 0 ;
  // }
}
