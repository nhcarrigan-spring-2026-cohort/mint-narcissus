import { Mail, Linkedin } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
export default function Login() {
    return (
        <><><div className="min-h-screen bg-[FDFBF7] flex justify-center px-4 py-12"></div><Card className="w-full max-w-xl rounded-2xl shadow-sm"></Card></><CardHeader className="text-center"></CardHeader><><CardTitle className="font-serif text-4xl text-[#1A2B48]">Interview Outfit Coordinator</CardTitle><p className="mt-2 text-base text-muted-foreground">Login to borrow or lend interview outfits</p><CardContent className="space-y-4">
            <button variant="outline" className="w-full gap-2">Linkedin <Linkedin className="h-4 w-4" />{">"}Continue with Linkedin</button>
            <div className="flex items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-xs tracking-widest text-muted-foreground">
                    OR CONTINUE WITH EMAIL
                </span>
                <Separator className="flex-1" />
            </div><form className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" placeholder="AB345£$" />
                </div>
                <Button type="submit" className="w-full gap-2 bg-[#1A2B48] text-white hover:bg-[#16253f]"><Mail className="h-4 w-4" />Login</Button>
            </form><div className="pt-2 text-center text-sm text-muted-foreground space-y-1">
                <p>
                    Don't have an account?{' '}
                    <a className="font-semibold text-[#1A2B48] hover:underline" href="/signup">
                        Sign up
                    </a>
                </p>
                <p>
                    Admin login?{' '}
                    <a className="font-semibold text-[#1A2B48] hover:underline" href="/admin">
                        Login as Admin
                    </a>
                </p>
            </div>
        </CardContent></></>

           );        
    }