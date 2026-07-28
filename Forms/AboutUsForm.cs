using System;
using System.Drawing;
using System.Windows.Forms;
using InventorySystem.Helpers;
using InventorySystem.Controls;

namespace InventorySystem.Forms
{
    public class AboutUsForm : BaseModalForm
    {
        private Label _lblName;
        private Label _lblVer;
        private Label _lblDesc;
        private Label _lblDev;
        private Button _btnContact;
        private Label _lblCopyright;

        public AboutUsForm()
        {
            InitializeAboutLayout();
            LocalizationManager.LanguageChanged += (s, e) => ApplyLocalization();
            ApplyLocalization();
            this.Size = new Size(500, 580);
        }

        private void ApplyLocalization()
        {
            LocalizationManager.ApplyRTL(this);
            this.TitleText = LocalizationManager.GetString("Nav_AboutUs");
            if (_lblName != null) _lblName.Text = LocalizationManager.GetString("AboutUs_AppName");
            if (_lblVer != null) _lblVer.Text = LocalizationManager.GetString("AboutUs_Version");
            if (_lblDesc != null) _lblDesc.Text = LocalizationManager.GetString("AboutUs_Desc");
            if (_lblDev != null) _lblDev.Text = LocalizationManager.GetString("AboutUs_DevInfo");
            if (_btnContact != null) _btnContact.Text = "  " + LocalizationManager.GetString("AboutUs_ContactSupport");
            if (_lblCopyright != null) _lblCopyright.Text = LocalizationManager.GetString("AboutUs_Copyright");
        }

        private void InitializeAboutLayout()
        {
            Panel container = new Panel { Dock = DockStyle.Fill, Padding = new Padding(30) };
            
            PictureBox pbLogo = new PictureBox {
                Size = new Size(120, 120),
                Location = new Point(160, 20),
                SizeMode = PictureBoxSizeMode.Zoom,
                BackColor = Color.Transparent
            };
            try { 
                string logoPath = System.IO.Path.Combine(Application.StartupPath, "Assets", "softio_logo.png");
                if (System.IO.File.Exists(logoPath)) pbLogo.Image = Image.FromFile(logoPath);
            } catch { }
            container.Controls.Add(pbLogo);

            _lblName = new Label {
                Font = new Font("Segoe UI", 16, FontStyle.Bold),
                ForeColor = ThemeConfig.PrimaryColor,
                TextAlign = ContentAlignment.MiddleCenter,
                Size = new Size(440, 35),
                Location = new Point(0, 150)
            };
            container.Controls.Add(_lblName);

            _lblVer = new Label {
                Font = new Font("Segoe UI", 10, FontStyle.Italic),
                ForeColor = ThemeConfig.MutedTextColor,
                TextAlign = ContentAlignment.MiddleCenter,
                Size = new Size(440, 25),
                Location = new Point(0, 190)
            };
            container.Controls.Add(_lblVer);

            _lblDesc = new Label {
                Font = new Font("Segoe UI", 10.5f),
                ForeColor = ThemeConfig.TextColorDark,
                TextAlign = ContentAlignment.MiddleCenter,
                Size = new Size(380, 80),
                Location = new Point(30, 230)
            };
            container.Controls.Add(_lblDesc);

            Panel divider = new Panel {
                Size = new Size(300, 1),
                BackColor = Color.FromArgb(230, 230, 230),
                Location = new Point(70, 320)
            };
            container.Controls.Add(divider);

            _lblDev = new Label {
                Font = new Font("Segoe UI", 9.5f, FontStyle.Bold),
                ForeColor = ThemeConfig.TextColorDark,
                TextAlign = ContentAlignment.MiddleCenter,
                Size = new Size(440, 25),
                Location = new Point(0, 340)
            };
            container.Controls.Add(_lblDev);

            _btnContact = new ModernButton {
                Size = new Size(200, 45),
                Location = new Point(150, 385),
                Cursor = Cursors.Hand,
                Image = ThemeConfig.TintImage(ThemeConfig.GetNuricon("contact_us"), Color.White),
                ImageAlign = ContentAlignment.MiddleLeft,
                TextImageRelation = TextImageRelation.ImageBeforeText,
                Padding = new Padding(10, 0, 0, 0)
            };
            ThemeConfig.ApplyPrimaryButton(_btnContact);
            _btnContact.Click += (s, e) => {
                try { System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo("mailto:softioservices@gmail.com") { UseShellExecute = true }); }
                catch { MessageHelper.ShowInfo(LocalizationManager.GetString("Msg_ContactSupport")); }
            };
            container.Controls.Add(_btnContact);

            _lblCopyright = new Label {
                Font = new Font("Segoe UI", 8.5f),
                ForeColor = ThemeConfig.MutedTextColor,
                TextAlign = ContentAlignment.MiddleCenter,
                Size = new Size(440, 20),
                Location = new Point(0, 450)
            };
            container.Controls.Add(_lblCopyright);

            this.ContentPanel.Controls.Add(container);
        }
    }
}
